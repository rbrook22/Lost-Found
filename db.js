const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'lost-found-app',
    user: 'postgres',
    password: ''
};
const db = pgp(cn);