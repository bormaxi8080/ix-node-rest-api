const { Pool } = require('pg')

const pool = new Pool({
    user: 'test2',
    host: 'localhost',
    database: 'test2',
    password: 'sO0vB7jM6zqO9h',
    port: 5432
})

module.exports = pool