import { db } from "../connect.js";
import jwt from "jsonwebtoken";

export const getUser = (req, res) => {
  const userId = req.params.userId;
  const q = "SELECT * FROM users WHERE id=?"

  db.query(q, [userId], (error, data) => {
    if (error) return res.status(500).json(error);
    const { password, ...info } = data[0];
    return res.json(info);
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

    db.query(q, values, (error, data) => {
      if (error) {
        return res.status(500).json({ error: "Failed to update profile" });
      }

      // Fetch the updated user data from the database
      db.query("SELECT * FROM users WHERE id = ?", [userId], (err, result) => {
        if (err) {
          return res.status(500).json({ error: "Failed to fetch updated profile data" });
        }

        const { password, ...updatedUser } = result[0];
        console.log(updatedUser)
        return res.status(200).json(updatedUser);
      });
    });
  });
};

