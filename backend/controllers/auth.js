import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "fs";


// Handle user registration
export const register = (req, res) => {

  // Check if user exists
  const q = "SELECT * FROM users WHERE email = ?"

  db.query(q, [req.body.email], (error, data) => {
    if (error) return res.status(500).json(error)

    // If user already exists return error
    if (data.length) return res.status(404).json("User already exists!");

    // Create a new user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (`firstName`, `lastName`, `email`, `password`) VALUE (?)"

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword
    ];

    // Insert user into database
    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("User has been created");
    });
  });
};

// Handle login
export const login = (req, res) => {

  // Retrive data based on email
  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (error, data) => {
    if (error) return res.status(500).json(error);

    // If user doesnt exist return error
    if (data.length === 0) return res.status(404).json("User not found!");

    // Check if passwords match the stored hash
    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

    if (!checkPassword) return res.status(400).json("Wrong password or username");

    // Generate a JWT token for the user
    const token = jwt.sign({ id: data[0].id }, "secretkey");

    // Exclude password from the response
    const { password, ...others } = data[0];

    res.cookie("accessToken", token, {
      httpOnly: true,
    })
      .status(200).json(others);
  });
};

// Handle logout
export const logout = (req, res) => {
  // Clear the access token cookie
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User has been logged out");
};

export const deleteUser = (req, res) => {
  const userId = req.params.userId;

  // Retrive associated posts of the user
  db.query("SELECT id, img FROM posts WHERE userId = ?", [userId], (error, posts) => {
    if (error) {
      return res.status(500).json({ error: "Failed to delete user" });
    }

    // Loop through each post to handle images
    posts.forEach((post) => {
      const { img } = post;

      if (img) {
        // Delete post image from uploads folder
        fs.unlink(`uploads/${img}`, (err) => {
          if (err) {
            console.error(`Error deleting post image (${img}):`, err);
          } else {
            console.log(`Post image (${img}) deleted successfully.`);
          }
        });
      }
    });

    // Get the user's profilePic and coverPic from the database
    db.query("SELECT profilePic, coverPic FROM users WHERE id = ?", [userId], (error, result) => {
      if (error) {
        return res.status(500).json({ error: "Failed to delete user" });
      }

      const { profilePic, coverPic } = result[0];

      // Delete user from database
      const q = "DELETE FROM users WHERE id = ?";

      db.query(q, [userId], (error, result) => {
        if (error) {
          return res.status(500).json({ error: "Failed to delete user" });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ error: "User not found" });
        }

        // Unlink profilePic and coverPic images
        if (profilePic) {
          fs.unlink(`uploads/${profilePic}`, (err) => {
            if (err) {
              console.error('Error deleting profile picture:', err);
            } else {
              console.log('Profile picture deleted successfully.');
            }
          });
        }

        if (coverPic) {
          fs.unlink(`uploads/${coverPic}`, (err) => {
            if (err) {
              console.error('Error deleting cover picture:', err);
            } else {
              console.log('Cover picture deleted successfully.');
            }
          });
        }

        return res.status(200).json({ message: "User deleted successfully" });
      });
    });
  });
}