import { db } from "../connect.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export const register = (req, res) => {

  // CHECK IF USER EXISTS
  const q = "SELECT * FROM users WHERE email = ?"

  db.query(q, [req.body.email], (error, data) => {
    if (error)
      return res.status(500).json(error)
    if (data.length) return res.status(404).json("User already exists!");
    //CREATE A NEW USER
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);

    const q = "INSERT INTO users (`firstName`, `lastName`, `email`, `password`) VALUE (?)"

    const values = [
      req.body.firstName,
      req.body.lastName,
      req.body.email,
      hashedPassword
    ];

    db.query(q, [values], (error, data) => {
      if (error) return res.status(500).json(error);
      return res.status(200).json("User has been created");
    });
  });
};

export const login = (req, res) => {

  const q = "SELECT * FROM users WHERE email = ?";

  db.query(q, [req.body.email], (error, data) => {
    if (error) return res.status(500).json(error);
    if (data.length === 0) return res.status(404).json("User not found!");

    const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);

    if (!checkPassword) return res.status(400).json("Wrong password or username");

    const token = jwt.sign({ id: data[0].id }, "secretkey");

    const { password, ...others } = data[0];

    res.cookie("accessToken", token, {
      httpOnly: true,
    })
      .status(200).json(others);
  });
};

export const logout = (req, res) => {
  res.clearCookie("accessToken", {
    secure: true,
    sameSite: "none"
  }).status(200).json("User has been logged out");
};