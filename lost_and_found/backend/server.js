import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";

const app = express();

// Enable Cross-Origin Resource Sharing so frontend can talk to backend
app.use(cors());

// Parses req.body's json to javascript object
app.use(express.json());

// For user authentification (login/signup/...)
// For any request that starts with /api/auth, use the router defined in authRoutes.js
app.use("/api/auth", authRoutes);

const PORT = 5050;
app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
});