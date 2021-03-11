const mysql2 = require('mysql2');

require('dotenv').config();

const connection = mysql2.createConnection({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: 'localhost',
    port: 3306
});

module.exports = connection;
