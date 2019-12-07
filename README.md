# Off-Chain API

### Start Local Ethereum Chain and Create Ethereum Bridge
```
ganche-cli 
```
** Open a New Window **



```
truffle migrate --reset --compile-all
ethereum-bridge -H localhost:8545 -a 1
```

### Start Application (Change the ContractAddr to Access)
```
node app.js
```

### Launch Local Tunnel 
```
lt --port 3002
```


### Put LocalHost into queryDB Function 


### Transfer Eth from one of the Ganache Accounts into the Access Smart Contract 
```

web3.eth.sendTransaction({'from': '0x2A25D9498eaab3E2B393bF8fB7464F5C5C7d9900', 'to': '0xAe84Ed331221a081213E12e7E490F3589eB3A281', 'value': 90000000000000000});
```

### Read current amount of Eth in Smart Contract
```
web3.eth.getBalance('CONTRACT ADDRESS')

```


### Get Test
```
curl http://localhost:3002
```

### Get Users
```
curl http://localhost:3002/users
```

### Get Users
```
curl http://localhost:3002/users
```


### Post a New User
```
curl -d "name=Christian&email=christian@gmail.com" http://localhost:3002/users/ken
```

### Modify a User
```
curl -X PUT -d "name={NAME}" -d "email={EMAIL}" http://localhost:3002/users/{ID}
```

curl -X PUT -d "name=Joe" -d "email=joe@gmail.com" http://localhost:3002/users/5/ken


### Delete a User
```
curl -X DELETE http://localhost:3002/users/5/ken
```



