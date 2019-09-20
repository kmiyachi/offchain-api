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

### Get Users
```
curl http://localhost:3002/users
```


### Post a New User
```
curl -d "name=Danny&email=danny@gmail.com" http://localhost:3002/users/ken
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
