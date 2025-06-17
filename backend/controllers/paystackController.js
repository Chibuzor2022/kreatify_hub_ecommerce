

// import crypto from 'crypto';

// export const handlePaystackWebhook = async (req, res) => {
//     console.log('Raw Body Type:', typeof req.body);
// console.log('Is Buffer?', Buffer.isBuffer(req.body)); // should be true

//   try {
//     const secret = process.env.PAYSTACK_SECRET_KEY;

//     const rawBody = req.body; // raw Buffer
//     const signature = req.headers['x-paystack-signature'];

//     // Hash the raw body
//     const hash = crypto
//       .createHmac('sha512', secret)
//       .update(rawBody)
//       .digest('hex');

//     // Signature mismatch = reject
//     if (hash !== signature) {
//       console.warn('🚨 Invalid Paystack Signature!');
//       return res.status(400).send('Invalid signature');
//     }

//     // ✅ Verified: now parse JSON
//     const event = JSON.parse(rawBody.toString('utf8'));
//     console.log('✅ Verified Paystack Event:', event);

//     if (event.event === 'charge.success') {
//       const reference = event.data.reference;

//       // ✅ Now you can update your DB, verify transaction, etc.
//       console.log('💵 Payment Success for reference:', reference);
//     }

//     return res.sendStatus(200); // Acknowledge fast
//   } catch (error) {
//     console.error('⚠️ Webhook error:', error);
//     return res.sendStatus(500);
//   }
// };



// import Order from '../models/orderModel.js';
// import asyncHandler from 'express-async-handler';


// export const paystackWebhook = asyncHandler(async (req, res)=> {
//   try {
//     // Verify signature
//     const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
//       .update(JSON.stringify(req.body))
//       .digest('hex');

//     if (hash !== req.headers['x-paystack-signature']) {
//       return res.status(401).send('Unauthorized');
//     }

//     const event = req.body;
    
//     if (event.event === 'charge.success') {
//       const { reference, amount } = event.data;
      
//       // Find order by Paystack reference
//       const order = await Order.findOne({ 'paymentResult.id': reference });
      
//       if (order && amount === order.totalPrice * 100) {
//         order.isPaid = true;
//         order.paidAt = new Date();
//         order.paymentResult.status = 'success';
//         await order.save();
//       }
//     }

//     res.send(200);
//   } catch (error) {
//     console.error('Webhook error:', error);
//     res.status(500).send('Webhook processing failed');
//   }
// });


// export const handleWebhook = asyncHandler(async (req, res)=> {
//   try {
//     // Verify signature
//     const hash = crypto.createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
//       .update(JSON.stringify(req.body))
//       .digest('hex');

//     if (hash !== req.headers['x-paystack-signature']) {
//       return res.status(401).send('Unauthorized');
//     }

//     const event = req.body;
    
//     if (event.event === 'charge.success') {
//       const { reference, amount, customer } = event.data;
      
//       // Find order by Paystack reference
//       const order = await Order.findOne({ 'paymentResult.id': reference });
      
//       if (order) {
//         if (amount === order.totalPrice * 100) {
//           order.isPaid = true;
//           order.paidAt = new Date(event.data.paid_at);
//           order.paymentResult.status = 'success';
//           await order.save();
//           console.log(`Order ${order._id} marked as paid via webhook`);
//         }
//       } else {
//         console.warn('No order found for reference:', reference);
//       }
//     }

//     res.sendStatus(200);
//   } catch (error) {
//     console.error('Webhook processing failed:', error);
//     res.status(500).send('Webhook error');
//   }
// });

// export const paystackWebhook = asyncHandler(async (req, res) => {
//   const event = req.body;

//   // Verify it's a successful payment event
//   if (event.event === 'charge.success') {
//     const { reference, metadata } = event.data;

//     // Find and update the order
//     const order = await Order.findById(metadata.orderId);
    
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: reference,
//         status: 'success',
//         update_time: Date.now(),
//         email_address: event.data.customer.email,
//       };

//       await order.save();
//       res.status(200).send('Webhook received');
//     } else {
//       res.status(404).send('Order not found');
//     }
//   } else {
//     res.status(200).send('Event not handled');
//   }
// });