# Off-Chain API
![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

## Overview

This repository contains an application built to manage a hybrid on-chain and off-chain storage system to manage user data. An on-chain verification system is used to ensure data privacy and integrity, allowing only certain verified users of the blockchain network to access and modify existing data in the off-chain database. An off-chain storage is used to promote scalability and flexibility of managing and storing larger amounts of data. This API provides the framework to set up a verification system on top of a database storage to manage and record interactions with the data *(viewing, adding, modifiying, or deleting user data)*.

## Setup & Run

### Start Local Ethereum Chain and Create Ethereum Bridge
**1. Open terminal and start Ganache server:**
* These accounts will be used to make transactions with the blockchain network and call smart contract functions.
```sh
$ ganche-cli 
```
**2. Open a new terminal and deploy contracts/setup oracle:**

```
$ truffle migrate --reset --compile-all
$ ethereum-bridge -H localhost:8545 -a 1
```
The oracle will be set up to interact with the on-chain and off-chain system. Save the contract address for *Access* into the application *routes.js* to instantiate the contract.

**3. Open a new terminal and start application:**
```
$ node app.js
```

**4. Open a new terminal and launch Local Tunnel:**
```
$ lt --port 3002
```

## API Interactions

### Get Test
Test connection to the local server and ensure application is started correctly. A message should be returned by running the following command:
```sh
$ curl http://localhost:3002
```

### Get All Users
Retrieve all users within the off-chain storage system after being granted access by on-chain vericiation. A JSON of user data should be returned by running the following command:
```sh
$ curl http://localhost:3002/allUsers/{verified_user}
```

### Post a New User
Post a new user to the off-chain storage system after being granted access by on-chain verification. User information should be specified in a command in the following format:
```sh
$ curl -d "id={ID}&name={NAME}&email={EMAIL}&hash={HASH}" http://localhost:3002/users/{verified_user}
```

### Modify a User
Modify an existing user's data on the off-chain storage after being granted access by on-chain verification. New user information should be specified in a command in the following format:
```sh
$ curl -X PUT -d "name={NAME}" -d "email={EMAIL}" http://localhost:3002/users/{ID}
```
```sh
$ curl -X PUT -d "name=Joe" -d "email=joe@gmail.com" http://localhost:3002/users/5/ken
```

### Delete a User
Delete an existing user's data from the off-chain storage after being granted access by on-chain verication. Sepcific user should be deleted by a command in the following format:
```sh
$ curl -X DELETE http://localhost:3002/users/5/ken
```

### Transfer Eth from one of the Ganache Accounts into the Access Smart Contract 
```javascript
web3.eth.sendTransaction({'from': '0x520eB4aae847113b20583a8B0CFf2b7a09c02A50', 'to': '0x2C04E979225BD36D7094DF3E873CD8C541c9B2e6', 'value': 90000000000000000});
```

### Read current amount of Eth in Smart Contract
```javascript
web3.eth.getBalance('CONTRACT ADDRESS')
```

## To Do
- [ ] Put LocalHost into queryDB Function
