// routes/users.js
import express from "express";
import { findUserById } from "../models/userModel.js";

const router = express.Router();

// GET /api/users/:id/contact
router.get("/:id/contact", (req, res) => {
  if (!req.session.user) return res.status(401).json({ message: "Not logged in" });

  const userId = req.params.id;
  findUserById(userId, (err, results) => {
    if (err) return res.status(500).json({ message: "Database error" });
    if (results.length === 0) return res.status(404).json({ message: "User not found" });

    res.json({ email: results[0].email });
  });
});

export default router;
