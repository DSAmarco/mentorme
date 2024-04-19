import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
    createRate,
    getRates,
    deleteRate,
} from "../controllers/rate.controller.js";

const router = express.Router();

router.post("/rate/:id", verifyToken, createRate)
router.get("/:id", getRates)
router.delete("/:id", deleteRate)

export default router;