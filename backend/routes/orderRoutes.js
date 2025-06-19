import express from "express";
import {
	createOrder,
	getOrderById,
	updatePaymentReference,
	updateOrderToPaid,
	getMyOrders,
	getAllOrders,
	deleteOrder,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.route("/:id").delete(protect, admin, deleteOrder);
router.route("/myorders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.put('/:id/payment', protect, updatePaymentReference);

export default router;
