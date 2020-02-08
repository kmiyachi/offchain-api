const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'remotemysql.com',
    user: 'JK1VZBM0Ws',
    password: 'ALaqTE26oN',
    database: 'JK1VZBM0Ws',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;