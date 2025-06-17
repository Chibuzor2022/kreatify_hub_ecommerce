import express from "express";
import {
	createOrder,
	getOrderById,
	updatePaymentReference,
	verifyOrderPayment,
	updateOrderToPaid,
	getMyOrders,
	getOrders,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.get('/:id/verify', verifyOrderPayment); // Add this line
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.put('/:id/payment', protect, updatePaymentReference);

export default router;
