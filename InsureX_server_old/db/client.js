const { Pool } = require('pg')

const client = new Pool({
    user: 'insurex',
    host: '54.211.135.79',
    database: 'InsureX',
    password: 'sO0vB7jM6zqO9h3vv',
    port: 5432
})
const execute = async () => {
    try {
        const rows = await client.query({
            text: "CREATE TABLE insurance_companies (id bigint PRIMARY KEY)", rowMode: 'array'
        })   // gets connection
        console.log(rows)
        return true;
    } catch (error) {
        console.error(error.message);
        return false;
    }
};

execute().then(result => {
    if (result) {
        console.log("table created")
    }
})

module.exports = client