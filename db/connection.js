const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "asd",
      database: "employee_db",
    },
    console.log("Connected to database")
);

module.exports = db;