// This file is a connection between node.js server and MYSQL database
import 'dotenv/config'
import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

//create a connection to the database we created in MYSQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 3306,
  password: process.env.DB_PASS ?? process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected!");
});

export default db;