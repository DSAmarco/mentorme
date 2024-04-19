import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { getOrders, intent, confirm, completeOrder} from "../controllers/order.controller.js";

const router = express.Router();

//router.post("/:gigId", verifyToken, createOrder);
router.get("/", verifyToken, getOrders);
router.post("/create-payment-intent/:id", verifyToken, intent);
router.put("/", verifyToken, (req, res) => {
    if (req.query.action === 'confirm') {
        return confirm(req, res);
    } else if (req.query.action === 'complete') {
        return completeOrder(req, res);
    } else {
        res.status(400).send('Invalid action specified');
    }
});

export default router;
