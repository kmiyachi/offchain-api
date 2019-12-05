// Load the MySQL pool connection
const pool = require('../data/config');
const accessArtifact = require('../build/contracts/Access.json');
//const sysAdminArtifact = require('../build/')


const request = require('request');
var contractAddr =  '0x54380b6ea8e841B4933111086934675df03e7d13';
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);
const contract = require('truffle-contract');
const accessArtifacts = require('../build/contracts/Access.json');
const isbn = require('node-isbn');

let catchRevert = require("./exceptions.js").catchRevert;


const Access = contract(accessArtifacts)

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
var access = Access.deployed().then((res) => {
    console.log("RESULT: ",res.address);
    return res;
});
//console.log("SHIT: ", access.address)
var access = new web3.eth.Contract(accessArtifact.abi, contractAddr, {from: '0x84Fc70E796E0339001a027202e1dDe7d01BA347b'})
//console.log(access.address);

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
const router = app => {
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
            res = await access.methods.researcherAccess(lunaID).send({from: accountArr[0]})
            //response.send({message: res})
            queryRes = await access.methods.queryDB().send({from: accountArr[0]});
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
    app.get('/users/:id/:lunaID', async function (request, response) {
        const id = request.params.id;
        const lunaID = request.params.lunaID;
        try{
            res = await access.methods.researcherAccess(lunaID).send({from: accountArr[0]})
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

        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
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

    // Update an existing user
    app.put('/users/:id/:lunaID', async function (request, response) {
        const id = request.params.id;
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

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id/lunaID', async function (request, response) {
        const id = request.params.id;
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

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
module.exports = router;
