// Load the MySQL pool connection
const pool = require('../data/config');
const accessArtifact = require('../build/contracts/Access.json');


const request = require('request');
var contractAddr =  '0x6aE6B5119B854024A70a0382C52F8CD793f78af7';
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

var access = Access.at(contractAddr);
var access = Access.deployed();
var access = new web3.eth.Contract(accessArtifact.abi, contractAddr, {from: '0x1F8cBF54d39e94808Ff0eAA1902b7B29e6bdfD80'})


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



    // Display all users
    app.get('/users', (request, response) => {
        pool.query('SELECT * FROM users', (error, result) => {
            if (error) throw error;
            response.send(result);
        });
    });

    // Display a single user by ID
    app.get('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;

            response.send(result);
        });
    });

    // Add a new user
    app.post('/users', (request, response) => {
        pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
            if (error) throw error;

            response.status(201).send(`User added with ID: ${result.insertId}`);
        });
    });

    // Update an existing user
    app.put('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
            if (error) throw error;

            response.send('User updated successfully.');
        });
    });

    // Delete a user
    app.delete('/users/:id', (request, response) => {
        const id = request.params.id;

        pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
            if (error) throw error;
            response.send('User deleted.');
        });
    });
}

// Export the router
module.exports = router;
