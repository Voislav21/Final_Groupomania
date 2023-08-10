import express from "express";
import { getUser, updateUser, serachQuery, deleteUser } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser);
router.get("/search", serachQuery);
router.put("/update", updateUser);
router.delete("/:userId", deleteUser);

export default router;