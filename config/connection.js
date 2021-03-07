//Use MySQL to connect to mysql database and perform queries
//Use inquirer to interact with user via command line (see team bulider app)
//Use console.table to display table data in the command line (practice with it)

const mysql = require("mysql");

require('dotenv').config();

const connection = mysql.createConnection(
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  process.env.DB_NAME,
  {
    host: "localhost",
    port: 3306,
  }
);

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");

  //SQL CODE GOES HERE


});


