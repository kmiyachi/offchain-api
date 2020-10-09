// Load the MySQL pool connection
const pool = require('../data/config');
const accessArtifact = require('../build/contracts/Access.json');
//const sysAdminArtifact = require('../build/')


const request = require('request');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
const contract = require('@truffle/contract');
const isbn = require('node-isbn');
const contractAddr = '0x0145F8a998bE435eA08c71653424E5C60E08a4a7';    // set as Access contract address

let catchRevert = require("./exceptions.js").catchRevert;
const Access = contract(accessArtifact)

var fs = require("fs");
var Web3 = require('web3');

if (typeof web3 !== 'undefined') {
  var web3 = new Web3(web3.currentProvider)
} else {
  var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
}

var access;
var accountArr = [];

Access.setProvider(web3.currentProvider)

//var access = Access.at(contractAddr);
Access.deployed().then((res) => {
    console.log("RESULT: ", res.address);
    return res;
});

var access = new web3.eth.Contract(accessArtifact.abi, contractAddr, {from: '0xeF910A670C8B3884835CCe7A5f15bCBd7298F4d7'});

console.log("access address: ", access.options.address)

//console.log("Access: ", access);
//console.log("Access Methods: ", access.methods);
web3.eth.getAccounts().then((result)=>{
    setAccounts(result)
});

function setAccounts(results){
    accountArr = results;
    console.log("ACCOUNTS: ", accountArr);
}


// Route the app
const router = async app => {
    // Display welcome message on the root
    app.get('/test/:account', async function(request, response) {
        console.log(request.params.account)
        if (request.params.account == "0") {
            acc = accountArr[0]
        }
        else {
            acc = accountArr[1]
        }
        try{
            res = await access.methods.getAccess().send({from: acc})
            response.send({message: res})
          }
          catch(error){
            const revertFound = error.message.search('revert') >= 0;
            response.send({
                error: revertFound,
                errMessage: error.message
            });
          }
    });


    app.get('/', async function(request, response) {
        response.send("Off-Chain Transactions!\n")
    });
    app.get('/fail', async function(request, response) {

        acc = accountArr[1]
        try{
            await access.methods.getAccess().send({from: acc, gas: 6700000});
          }
          catch(error){
            const revertFound = error.message.search('revert') >= 0;
            response.send({
                error: revertFound
            });
          }
    });


    
    //0x42bb9572ab12e65e117a8a5abf492d48d9e7cf02589dc63cd2feb7477f64c419
    // Display all users
    app.get('/allUsers/:lunaID', async function (request, response) {
        const lunaID = request.params.lunaID;
        var queryRes = ""
        try{
            res = await access.methods.researcherAccess(lunaID).call() //send({from: accountArr[0]})
            //response.send({message: res})
            //queryRes = await access.methods.queryDB().send({from: accountArr[0]});
          }
        catch(error){
            const revertFound = error.message.search('revert') >= 0;
            response.send({
                error: revertFound,
                errMessage: error.message
            });
            return;
        }
        console.log(queryRes)
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/user/:id/:lunaID', async function (request, response) {
        const id = request.params.id;
        const lunaID = request.params.lunaID;
        try{
            res = await access.methods.researcherAccess(lunaID).send({from: accountArr[0]})
            //response.send({message: res})
            // Variable will set the hash from Smart Contract (from Oracle)
          }
        catch(error){
            const revertFound = error.message.search('revert') >= 0;
            response.send({
                error: revertFound,
                errMessage: error.message
            });
            return;
        }


        // pool.query('SELECT hash from users WHERE id = ?' id, (error, result) =>{// CHECK HASH})
        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            res = result[0]
            var hash = res['hash'];
            var name = res['name'];
            var email = res['email'];
            var chash = sha256(name+email);
            // if hash == chash:
            response.send(result[0]);
        });
    });

    // Add a new user
    app.post('/users/:lunaID', async function (request, response) {

        const lunaID = request.params.lunaID;
        try{
            res = await access.methods.memberAccess(lunaID).send({from: accountArr[0]})
            //response.send({message: res})
          }
        catch(error){
            const revertFound = error.message.search('revert') >= 0;
            response.send({
                error: revertFound,
                errMessage: error.message
            });
            return;
        }

        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });
}

// Export the router
module.exports = router;
