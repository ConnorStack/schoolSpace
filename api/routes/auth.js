import express from "express";
import { login, register, logout, registerUser, testget } from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login)
router.post("/register", register)
router.post("/logout", logout)
router.post("/registerUser", registerUser)
router.get("/testGet", testget)


export default router