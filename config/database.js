const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'ims',
    password: 'postgres',
    port: 5432,
});

pool.on('connect', () => console.log(''));

module.exports = {
  query: (text, params) => pool.query(text, params),
};
