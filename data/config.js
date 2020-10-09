const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'remotemysql.com',
    user: 'WgwxfXdkCv',
    password: 'HIX9nzJAZb',
    database: 'WgwxfXdkCv',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;