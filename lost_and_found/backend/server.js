import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

// Enable Cross-Origin Resource Sharing so frontend can talk to backend
app.use(cors());

// Parses req.body's json to javascript object
app.use(express.json());

// For user authentification (login/signup/...)
// For any request that starts with /api/auth, use the router defined in authRoutes.js
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes)

// When someone requests http://localhost:5050/uploads/image.jpg, find the file in the backend uploads/ folder, and sends it to the browser
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); // specifies absolute path to current directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});