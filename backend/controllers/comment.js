import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import moment from "moment";

export const getComments = (req, res) => {

  const q = `SELECT comment.*, user.id AS userId, firstName, lastName, profilePic FROM comments AS comment JOIN users as user ON (user.id = comment.userId)
    WHERE comment.postId = ? ORDER BY comment.createdAt DESC`;

  db.query(q, [req.query.postId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data);
  });
};


export const addComment = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO comments (`desc`, `createdAt`, `userId`, `postId`) VALUES (?)";

    const values = [
      req.body.desc,
      moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      userInfo.id,
      req.body.postId
    ]

    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Comment has been created");
    });
  });
};