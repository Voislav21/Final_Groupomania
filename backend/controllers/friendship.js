import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getFriendships = (req, res) => {
  const q = `SELECT userId FROM friendships WHERE friendId = ?`;

  db.query(q, [req.query.friendId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data.map(friendship => friendship.userId));
  });
};

export const getFriends = (req, res) => {
  const q = `
  SELECT f.friendId, u.firstName, u.lastName, u.profilePic 
  FROM friendships AS f 
  JOIN users AS u ON f.friendId = u.id
  WHERE f.userId = ?`;

  db.query(q, [req.query.userId], (error, data) => {
    if (error) return res.status(500).json(error);
    return res.status(200).json(data);
  });
};


export const addFriendship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = "INSERT INTO friendships (`userId`, `friendID`) VALUES (?)";

    const values = [
      userInfo.id,
      req.body.userId
    ];

    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Friendship added");
    });
  });
};

export const deleteFriendship = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).json("Not logged in!");

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) return res.status(403).json("Token is not valid!");

    const q = "DELETE FROM friendships WHERE `userId` = ? AND `friendId` = ?";

    db.query(q, [userInfo.id, req.query.userId], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("Unfriended");
    });
  });
};