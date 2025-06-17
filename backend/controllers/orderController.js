import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import mongoose from 'mongoose';
import axios from 'axios';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private

 const createOrder = async (req, res) => {
  try {
    const { 
      orderItems, 
      shippingAddress, 
      paymentMethod, 
      itemsPrice, 
      shippingPrice, 
      taxPrice, 
      totalPrice 
    } = req.body;

    // Validate required fields
    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'No order items' });
    }

    if (!paymentMethod) {
      return res.status(400).json({ message: 'Payment method required' });
    }

    if (totalPrice <= 0) {
      return res.status(400).json({ message: 'Total price must be positive' });
    }

    // Validate order items structure
    const validatedItems = orderItems.map(item => {
      if (!mongoose.Types.ObjectId.isValid(item.product)) {
        throw new Error(`Invalid product ID: ${item.product}`);
      }
      return {
        product: item.product,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity
      };
    });

    const order = new Order({
      user: req.user._id,
      orderItems: validatedItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
      paymentResult: {
        id: 'pending',
        status: 'pending'
      }
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({
      message: 'Order creation failed',
      error: error.message
    });
  }
};

const updatePaymentReference = async (req, res) => {
  try {
    const { reference } = req.body;
    
    if (!reference) {
      return res.status(400).json({ message: 'Payment reference required' });
    }

    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    order.paymentResult = {
      id: reference,
      status: 'initiated',
      update_time: new Date().toISOString()
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);

  } catch (error) {
    console.error('Payment reference update error:', error);
    res.status(500).json({
      message: 'Failed to update payment reference',
      error: error.message
    });
  }
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );

  if (order) {
    res.json(order);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

const verifyOrderPayment = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Skip verification if already paid
    if (order.isPaid) {
      return res.json(order);
    }

    // Verify Paystack payment
    if (order.paymentMethod === 'Paystack') {
      const response = await axios.get(
        `https://api.paystack.co/transaction/verify/${order.paymentResult?.id}`,
        {
          headers: {
            Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
          }
        }
      );

      const paymentData = response.data.data;
      
      if (paymentData.status === 'success' && 
          paymentData.amount === order.totalPrice * 100) {
        order.isPaid = true;
        order.paidAt = new Date(paymentData.paid_at || Date.now());
        order.paymentResult = {
          id: paymentData.reference,
          status: paymentData.status,
          update_time: new Date().toISOString(),
          email_address: paymentData.customer?.email
        };
        
        await order.save();
        return res.json(order);
      }
    }

    res.status(400).json({ message: 'Order not yet paid' });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({ 
      message: 'Payment verification failed',
      error: error.message 
    });
  }
};


// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } else {
    res.status(404);
    throw new Error('Order not found');
  }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.json(orders);
});

// @desc    Get all orders (Admin)
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.json(orders);
});


export {
  createOrder,
  updatePaymentReference,
  getOrderById,
  verifyOrderPayment,
  updateOrderToPaid,
  getMyOrders,
  getOrders,
};
