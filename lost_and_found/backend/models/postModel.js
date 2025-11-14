//Helper functions that interact with mysql database

import db from "../db/connection.js"

export const createPost = (user_id, post_type, title, description, category, address, contact, callback) => {
  const sql = `
    INSERT INTO Posts (user_id, post_type, title, description, category, address, contact)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  db.query(sql, [user_id, post_type, title, description, category, address, contact], callback);
};

export const createImage = (post_id, file_path, file_name, callback) => {
  const sql = `
    INSERT INTO Images (post_id, file_path, file_name)
    VALUES (?, ?, ?)
  `;
  db.query(sql, [post_id, file_path, file_name], callback);
};

export const getAllPosts = (callback) => {
  const sql = `SELECT * FROM Posts ORDER BY created_at DESC`;
  db.query(sql, callback);
};

export const getPostById = (id, callback) => {
  const sql = `SELECT * FROM Posts WHERE id = ?`;
  db.query(sql, [id], callback);
};

export const getPostsByType = (post_type, callback) => {
  const sql = `SELECT * FROM Posts WHERE post_type = ?`;
  db.query(sql, [post_type], callback);
};

export const getPostsByUserId = (user_id, callback) => {
  const sql = `SELECT * FROM Posts WHERE user_id = ? ORDER BY created_at DESC`;
  db.query(sql, [user_id], callback);
};

export const updatePost = (id, title, description, category, address, contact, callback) => {
  const sql = `
    UPDATE Posts 
    SET title=?, description=?, category=?, address=?, contact=?
    WHERE id=?
  `;
  db.query(sql, [title, description, category, address, contact, id], callback);
};

export const markPostResolved = (id, callback) => {
  const sql = `
    UPDATE Posts
    SET status = 'Resolved'
    WHERE id = ?
  `;
  db.query(sql, [id], callback);
};

export const deletePost = (id, callback) => {
  const sql = `DELETE FROM Posts WHERE id = ?`;
  db.query(sql, [id], callback);
};