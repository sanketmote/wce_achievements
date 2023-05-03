import express from "express";
import { getUser , updateUser,getCount} from "../controllers/user.js";

const router = express.Router()

router.get("/find/:userId", getUser)
router.get("/count", getCount)
router.put("/", updateUser)


export default router