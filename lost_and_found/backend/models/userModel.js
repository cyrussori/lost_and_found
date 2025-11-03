//Helper functions that interact with mysql database

import db from "../db/connection.js";

export const createUser = (name, email, hashedPassword, callback) => {
  const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";
  db.query(sql, [name, email, hashedPassword], callback);
};

export const findUserByEmail = (email, callback) => {
  const sql = "SELECT * FROM users WHERE email = ?";
  db.query(sql, [email], callback);
};