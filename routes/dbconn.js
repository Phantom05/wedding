const mysql = require('mysql');
const connection = mysql.createConnection({
  supportBigNumbers:true,
  bigNumberStrings:true,
  host:"localhost",
  user:"root",
  password:"root",
  database:"db_users"
});

module.exports = connection;
