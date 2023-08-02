import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

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

    /*LEFT JOIN friendships AS friends ON (post.userId = friends.friendId) 
    WHERE (friends.userId = ? AND friends.status = 'accepted') OR post.userId = ?*/

    const values = userId !== "undefined" ? [userId] : [userInfo.id, userInfo.id];

    db.query(q, values, (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
};

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

    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Post has been created");
    });
  });
};

export const deletePost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM posts WHERE `id` = ? AND `userID` = ?";

    db.query(q, [req.params.id, userInfo.id], (error, data) => {
      if (error) return res.status(500).json(error);
      if (data.affectedRows > 0) return res.status(200).json("Post has been deleted");
      return res.status(403).json("You can delete only your posts");
    });
  });
};