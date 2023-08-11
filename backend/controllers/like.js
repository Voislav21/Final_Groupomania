import { db } from "../connect.js";
import jwt from "jsonwebtoken";

// Function to get the list of user IDs who liked a specific post
export const getLikes = (req, res) => {
  const q = "SELECT userId FROM likes WHERE postId = ?";

  db.query(q, [req.query.postId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data.map(like => like.userId));
  });
};

// Function to add a new like to a post
export const addLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO likes (`userId`, `postId`) VALUES (?)";

    const values = [
      userInfo.id,
      req.body.postId
    ];

    // Insert the new like into the database
    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Post has been liked");
    });
  });
};

// Function to delete a like from a post
export const deleteLike = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM likes WHERE `userId` = ? AND `postId` = ?";

    // Delete the specified like from the database
    db.query(q, [userInfo.id, req.query.postId], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Post has been unliked");
    });
  });
};