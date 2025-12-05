// routes/users.js
import express from "express";
const router = express.Router();

// POST /api/users/me/update
router.post("/me/update", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  const userId = req.session.user.id;
  const { name, email } = req.body;

  // updateUserById is your DB function to update the user
  updateUserById(userId, { name, email }, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: "Database error" });
    }

    // Update the session info too
    req.session.user.name = name;
    req.session.user.email = email;

    res.json({
      message: "Profile updated",
      user: { id: userId, name, email },
    });
  });
});


export default router;
