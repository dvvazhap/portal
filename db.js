let mysql = require('mysql');

let con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "hr_db"
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = con;
