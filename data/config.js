const mysql = require('mysql');

// Set database connection credentials
const config = {
    host: 'remotemysql.com',
    user: 'V3pkwGwMP5',
    password: 'oBfdOrHYr1',
    database: 'V3pkwGwMP5',
};

// Create a MySQL pool
const pool = mysql.createPool(config);

// Export the pool
module.exports = pool;