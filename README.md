# Off-Chain API


### Start Application
```
node app.js
```

### Get Test
```
curl http://localhost:3002
```

### Get Users
```
curl http://localhost:3002/users
```

### Post a New User
```
curl -d "name={NAME}&email={EMAIL}" http://localhost:3002/users
```

### Modify a User
```
curl -X PUT -d "name=Ken" -d "email=ken@sdsc.edu" http://localhost:3002/users/{ID}
```

### Delete a User
```
curl -X DELETE http://localhost:3002/users/{ID}
```
