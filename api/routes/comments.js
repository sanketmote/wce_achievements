import express from "express";
import {
  getComments,
  addComment,
  deleteComment,
  getCount,
} from "../controllers/comment.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", addComment);
router.delete("/:id", deleteComment);
router.get('/count',getCount);

export default router;
