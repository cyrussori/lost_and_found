import express from "express";
import session from "express-session";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Enable Cross-Origin Resource Sharing so frontend can talk to backend
app.use(cors({
  origin: "http://localhost:5178", // your frontend
  credentials: true               //  allow cookies
}));

// Parses req.body's json to javascript object
app.use(express.json());

app.use(session({
  secret: "h&gsk3!k023-9Afw",   // any random string
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60, // 1 hour
  }
}));

// For user authentification (login/signup/...)
// For any request that starts with /api/auth, use the router defined in authRoutes.js
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes)
// Make the uploads folder publicly accessible, so that frontend can fetch the uploaded images
app.use("/uploads", express.static("uploads"));

// When someone requests http://localhost:5050/uploads/image.jpg, find the file in the backend uploads/ folder, and sends it to the browser
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // specifies absolute path to current directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 5050;

app.get('/api/users/me', async (req, res) => {
  try {
    const userId = req.user.id; // 从认证中获取
    const [rows] = await db.promise().query('SELECT name, email FROM users WHERE id = ?', [userId]);
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});