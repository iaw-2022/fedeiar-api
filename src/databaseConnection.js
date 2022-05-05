const dotenv = require('dotenv');
dotenv.config();

console.log("1: "+ process.env.DB_HOST);

const { Pool } = require('pg');
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
});

console.log("2: "+process.env.DB_HOST);

module.exports = pool;