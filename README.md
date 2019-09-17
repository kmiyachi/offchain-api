# Envato Tuts+ Tutorial: [Code Your First API With Node.js and Express: Connect a Database][published url]
## Instructor: [Tania Rascia][instructor url]

In this tutorial, we're going to set up a MySQL database to store all the data, connect to the database from our Node.js app, and allow the API to use the GET, POST, PUT, and DELETE methods to create a complete API.

------

These are source files for the Envato Tuts+ tutorial: [Code Your First API With Node.js and Express: Connect a Database][published url]

Available on [Envato Tuts+](https://tutsplus.com). Teaching skills to millions worldwide.

[published url]: http://code.tutsplus.com/tutorials/code-your-first-api-with-nodejs-and-express-connect-a-database--cms-31699
[instructor url]: https://tutsplus.com/authors/tania-rascia



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
