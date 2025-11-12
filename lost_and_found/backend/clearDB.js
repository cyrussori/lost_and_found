//helper that clears the database for testing purposes
import db from "./db/connection.js";

db.query("TRUNCATE TABLE users;", (err) => {
  if (err) throw err;
  console.log("Users table cleared!");
  process.exit();
});

db.query("TRUNCATE TABLE Posts;", (err) => {
  if (err) throw err;
  console.log("Posts table cleared!");
  process.exit();
});