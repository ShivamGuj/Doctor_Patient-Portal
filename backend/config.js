const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'portal',
    password: 'shivam14',
    port: 5432,
});

module.exports = pool;
