import express from "express";
import { getPosts, addPost, deletePost,getCount,verify } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts);
router.post("/", addPost);
router.delete("/:id", deletePost);
router.get("/count", getCount);
router.post("/verify", verify);

export default router;
