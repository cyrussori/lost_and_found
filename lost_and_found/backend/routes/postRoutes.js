//routes handling posts

import express from "express";
import { createPost, getAllPosts, getPostById, getPostsByType, getPostsByUserId, updatePost, markPostResolved, deletePost } from "../models/postModel.js";

const router = express.Router();

// Create a new post
router.post("/", (req, res) => {
  const { user_id, post_type, title, description, category, address, contact} = req.body;

  createPost(user_id, post_type, title, description, category, address, contact, (err, result) => {
    if (err) {
      console.error("Error creating post:", err);
      return res.status(500).json({ message: "Failed to create post" });
    }
    res.status(201).json({ message: "Post created successfully", postId: result.insertId });
  });
});

// Get all posts
router.get("/", (req, res) => {
  getAllPosts((err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching posts" });
    res.json(results);
  });
});

// Get one post by post id 
router.get("/:id", (req, res) => {
  const { id } = req.params;
  getPostById(id, (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching post" });
    if (results.length === 0) return res.status(404).json({ message: "Post not found" });
    res.json(results[0]);
  });
});

// Get post by post type (Lost/Found)
router.get("/type/:type", (req, res) => {
    const {type} = req.params;
    getPostsByType(type, (err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching posts of lost/found type" });
        res.json(results);
    });
});

// Get post by user id
router.get("/user/:userid", (req, res) => {
    const {userid} = req.params;
    getPostsByUserId(userid, (err, results) => {
        if (err) return res.status(500).json({ message: "Error fetching posts by user"});
        res.json(results);
    });
});

// Update a post by post id
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, description, category, address, contact } = req.body;

  updatePost(id, title, description, category, address, contact, (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to update post" });
    res.json({ message: "Post updated successfully" });
  });
});

// Mark a post as resolved
router.put("/:id/resolve", (req, res) => {
    const { id } = req.params;

    markPostResolved(id, (err, result) => {
      if (err) return res.status(500).json({ message: "Failed to mark post as resolved" });
      res.json({ message: "Post marked as resolved successfully" });
  });
});

// Delete a post by post id
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  deletePost(id, (err, result) => {
    if (err) return res.status(500).json({ message: "Failed to delete post" });
    res.json({ message: "Post deleted successfully" });
  });
});

export default router;