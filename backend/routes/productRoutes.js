import express from 'express';
import {
  getProducts,
  searchProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  getMyOrders,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(protect, admin, createProduct);
router.get('/myorders', protect, getMyOrders);
router.get('/search', searchProducts);
router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin,  updateProduct);


export default router;
