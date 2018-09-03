let mysql = require('mysql');
let config = require('./config')

let con = mysql.createConnection({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;
