import express from "express";
import { getFriendships, addFriendship, deleteFriendship, getFriends } from "../controllers/friendship.js";

const router = express.Router()

router.get("/", getFriendships);
router.get("/friends", getFriends);
router.post("/", addFriendship);
router.delete("/", deleteFriendship);

export default router;