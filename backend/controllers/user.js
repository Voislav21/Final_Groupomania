import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?"

  db.query(q, [userId], (error, data) => {
    if (error) return res.status(500).json(error);
    const {password, ...info} = data[0];
    return res.json(info);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = "UPDATE users SET `coverPic`=?, `profilePic`=?, `firstName`=?, `lastName`=?, `bio`=?, `city`=?, `from`=?, `relationship`=? WHERE id=?"

    db.query(q, [
      req.body.coverPic,
      req.body.profilePic,
      req.body.firstName,
      req.body.lastName,
      req.body.bio,
      req.body.city,
      req.body.from,
      req.body.relationship,
      userInfo.id
    ], (error, data) => {
      if (error) res.status(500).json(error);
      if (data.affectedRows > 0) return res.json("Updated!");
      return res.status(403).json("You can only update your own information!");
    });
  });
};