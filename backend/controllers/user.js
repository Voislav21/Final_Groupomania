import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import fs from 'fs';

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?"

  db.query(q, [userId], (error, data) => {
    if (error) return res.status(500).json(error);
    const { password, ...info } = data[0];
    return res.json(info);
  });
};

export const serachQuery = (req, res) => {
  const searchTerm = req.query.q;

  const q = `
    SELECT id, firstName, lastName, profilePic
    FROM users
    WHERE firstName LIKE '${searchTerm}%'
    OR lastName LIKE '${searchTerm}%'
    `;

  db.query(q, (error, results) => {
    if (error) return res.status(500).json({ error: "Failed to search users" });
    return res.status(200).json(results);
  });
};

export const updateUser = (req, res) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.status(401).json({ error: "Not logged in!" });
  }

  jwt.verify(token, "secretkey", (error, userInfo) => {
    if (error) {
      return res.status(403).json({ error: "Token is not valid!" });
    }

    const userId = userInfo.id;
    const fieldsToUpdate = [];
    const values = [];

    // Check if each field is provided in the request and add it to the update query
    const updateFields = [
      "coverPic",
      "profilePic",
      "firstName",
      "lastName",
      "bio",
      "city",
      "from",
      "relationship",
    ];

    for (const field of updateFields) {
      if (req.body[field]) {
        fieldsToUpdate.push(`${field} = ?`);
        values.push(req.body[field]);
      }
    }

    // If no fields were provided in the request, return an error
    if (fieldsToUpdate.length === 0) {
      return res.status(400).json({ error: "No fields to update" });
    }

    // Build the SQL query
    const q = `UPDATE users SET ${fieldsToUpdate.join(", ")} WHERE id = ?`;
    values.push(userId);

    // Retrieve the current user's data from the database to get the old profilePic and coverPic values
    db.query("SELECT profilePic, coverPic FROM users WHERE id = ?", [userId], (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Failed to fetch user data" });
      }

      const { profilePic: oldProfilePic, coverPic: oldCoverPic } = result[0];

      db.query(q, values, (error, data) => {
        if (error) {
          return res.status(500).json({ error: "Failed to update profile" });
        }

        // If the profilePic has changed, delete the old profile picture
        if (req.body.profilePic && req.body.profilePic !== oldProfilePic) {
          fs.unlink(`uploads/${oldProfilePic}`, (err) => {
            if (err) {
              console.error('Error deleting old profile picture:', err);
            } else {
              console.log('Old profile picture deleted successfully.');
            }
          });
        }

        // If the coverPic has changed, delete the old cover picture
        if (req.body.coverPic && req.body.coverPic !== oldCoverPic) {
          fs.unlink(`uploads/${oldCoverPic}`, (err) => {
            if (err) {
              console.error('Error deleting old cover picture:', err);
            } else {
              console.log('Old cover picture deleted successfully.');
            }
          });
        }

        // Fetch the updated user data from the database
        db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
          if (err) {
            return res.status(500).json({ error: "Failed to fetch updated profile data" });
          }

          const { password, ...updatedUser } = result[0];
          return res.status(200).json(updatedUser);
        });
      });
    });
  });
};

