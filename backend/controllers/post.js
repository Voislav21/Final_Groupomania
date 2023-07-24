import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getPosts = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify (token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = `SELECT post.*, user.id AS userId, firstName, lastName, profilePic FROM posts AS post JOIN users as user ON (user.id = post.userId)
    LEFT JOIN friendships AS friends ON (post.userId = friends.friendId) WHERE friends.userId= ? OR post.userId= ?
    ORDER BY post.createdAt DESC`;
  
    db.query(q, [userInfo.id, userInfo.id], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json(data);
    });
  });
};

export const addPost = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify (token, "secretkey", (error, userInfo) => {
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