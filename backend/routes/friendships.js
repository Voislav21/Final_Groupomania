import express from "express";
import { getFriendships, addFriendship, deleteFriendship } from "../controllers/friendship.js";

const router = express.Router()

router.get("/", getFriendships);
router.post("/", addFriendship);
router.delete("/", deleteFriendship);

export default router;