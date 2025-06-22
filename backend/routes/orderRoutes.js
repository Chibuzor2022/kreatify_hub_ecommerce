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

// Static and specific routes first
router.route("/myorders").get(protect, getMyOrders);
router.route("/").post(protect, createOrder).get(protect, admin, getAllOrders);
router.route("/:id/pay").put(protect, updateOrderToPaid);
router.route("/:id/payment").put(protect, updatePaymentReference);
router.route("/:id").get(protect, getOrderById).delete(protect, admin, deleteOrder);

export default router;
