import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";
import fs from "fs";

// Function to get posts based on user ID (or all posts if user ID is undefined)
export const getPosts = (req, res) => {

  const userId = req.query.userId;
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = userId !== "undefined"
      ? `SELECT DISTINCT post.*, user.id AS userId, firstName, lastName, profilePic 
         FROM posts AS post 
         JOIN users as user ON (user.id = post.userId)
         WHERE post.userId = ?
         ORDER BY post.createdAt DESC`
      :
      `SELECT DISTINCT post.*, user.id AS userId, firstName, lastName, profilePic 
         FROM posts AS post 
         JOIN users as user ON (user.id = post.userId)
         ORDER BY post.createdAt DESC`;

    const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
};

// Function to add a new post
export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO posts (`desc`, `img`, `createdAt`, `userId`) VALUES (?)";

    const values = [
      req.body.desc,
      req.body.img,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id
    ]

    // Insert the new post into the database
    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Post has been created");
    });
  });
};

// Function to delete a post
export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    // Query to get the post's image filename for deletion
    const unlinkQuery = "SELECT img FROM posts WHERE `id` = ? AND `userId` = ?";
    db.query(unlinkQuery, [req.params.id, userInfo.id], (error, result) => {
      if (error) return res.status(500).json(error);
      if (result.length === 0) return res.status(403).json("You can delete only your posts");

      const imgFilename = result[0].img;

      if (imgFilename) {
        // Delete the post image from the uploads folder
        fs.unlink(`uploads/${imgFilename}`, (error) => {
          if (error) {
            console.error("Error deleting post image:", error);
          } else {
            console.log("Post image deleted successfully");
          }
        });
      }
    });

    // Delete the post from the database
    const q = "DELETE FROM posts WHERE `id` = ? AND `userID` = ?";

    db.query(q, [req.params.id, userInfo.id], (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.affectedRows > 0) return res.status(200).json("Post has been deleted");
      return res.status(403).json("You can delete only your posts");
    });
  });
};