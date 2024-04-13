import express from "express";
import { register, login, logout, edit } from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)
router.put("/edit", edit)


export default router;
