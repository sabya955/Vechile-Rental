const { Pool } = require("pg");

const productPool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "carrent",
    password: "sabyasachi",  // Change this to your actual password
    port: 5433,
});

module.exports = productPool;  // ✅ Correctly export pool
