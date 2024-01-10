import express from "express";
const app = express()

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import commentRoutes from "./routes/comments.js";
import likeRoutes from "./routes/likes.js";
import friendshipRoutes from "./routes/friendships.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import multer from "multer";
import path from "path";

//MIDDLEWARE
// Parse incoming JSON data
app.use(express.json());

// Config CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // Allow requests from this origin
  credentials: true // Allow cookies to be sent along with requests
};

app.use(cors(corsOptions));
app.use(cookieParser());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/")
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to handle file uploads
app.post("/api/upload", upload.single("file"), (req, res) => {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Serve uploaded files statically
app.use("/api/uploads", express.static("uploads"));

// Use route handlers for different endpoints
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/users", userRoutes); // User management routes
app.use("/api/posts", postRoutes); // Post-related routes
app.use("/api/comments", commentRoutes); // Comment-related routes
app.use("/api/likes", likeRoutes); // Like-related routes
app.use("/api/friendships", friendshipRoutes); // Friendship-related routes

// Start the server
app.listen(process.env.PORT | PORT, () => {
  console.log("Api Working!")
});