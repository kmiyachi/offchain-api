# Off-Chain API
![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)

## Setup & Run

### Start Local Ethereum Chain and Create Ethereum Bridge
**1. Open terminal and start Ganache server:**
```sh
$ ganche-cli 
```
**2. Open a new terminal and deploy contracts:**

```
$ truffle migrate --reset --compile-all
$ ethereum-bridge -H localhost:8545 -a 1
```

**3. Open a new terminal and start application:**
```
$ node app.js
```

**4. Open a new terminal and launch Local Tunnel:**
```
$ lt --port 3002
```

### Transfer Eth from one of the Ganache Accounts into the Access Smart Contract 
```javascript
web3.eth.sendTransaction({'from': '0x520eB4aae847113b20583a8B0CFf2b7a09c02A50', 'to': '0x2C04E979225BD36D7094DF3E873CD8C541c9B2e6', 'value': 90000000000000000});
```

### Read current amount of Eth in Smart Contract
```javascript
web3.eth.getBalance('CONTRACT ADDRESS')
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
$ curl http://localhost:3002/allUsers
```

### Post a New User
Post a new user to the off-chain storage system after being granted access by on-chain verification. User information should be specified in a command in the following format:
```sh
$ curl -d "name=Christian&email=christian@gmail.com" http://localhost:3002/users/ken
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

## To Do
- [ ] Put LocalHost into queryDB Function
