import express from "express";
import { getUser, updateUser, serachQuery } from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser);
router.get("/search", serachQuery);
router.put("/update", updateUser);

export default router;