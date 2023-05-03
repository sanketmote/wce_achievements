import express from "express";
import { getLikes, addLike, deleteLike,getCount } from "../controllers/like.js";

const router = express.Router()

router.get("/", getLikes)
router.get("/count", getCount)
router.post("/", addLike)
router.delete("/", deleteLike)


export default router