const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'inventory_management_system',
    password: 'eyosiyas',
    port: 5432,
});

pool.on('connect', () => console.log('database connected'));

module.exports = {
  query: (text, params) => pool.query(text, params),
};