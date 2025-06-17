// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import PaystackPop from '@paystack/inline-js';
// import axios from 'axios';

// const PlaceOrderPage = () => {
//   const [loading, setLoading] = useState(false);

//   const { cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.auth);

//   const itemsPrice = Array.isArray(cartItems)
//     ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
//     : 0;

//   const shippingPrice = itemsPrice > 1000 ? 0 : 500; // example: free shipping if > 1000 Naira, else 500 Naira
//   const taxPrice = 0.075 * itemsPrice;
//   const totalPrice = itemsPrice + shippingPrice + taxPrice;
//   const payWithPaystack = async () => {
//   setLoading(true);
//   try {
//     // Initialize transaction on backend
//     // const { data } = await axios.post('/api/paystack/initialize', {
//     const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/paystack/initialize`, {
//       email: user.email,
//       amount: Math.round(totalPrice * 100), // amount in Kobo
//     });

//     if (!data.access_code) {
//       alert('Payment initialization failed: no access code.');
//       setLoading(false);
//       return;
//     }

//     const paystack = new PaystackPop();

//     // This returns a Promise that resolves on success or rejects on failure/close
//     await paystack.resumeTransaction(data.access_code);

   
//     // TODO: create order, verify on backend, redirect user, etc.

//   } catch (error) {
//     if (error.message === 'User closed the payment modal') {
//       alert('Payment was not completed.');
//     } else {
//       console.error('Payment initialization error:', error);
//       alert('Failed to initialize payment. Try again later.');
//     }
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Place Order</h1>

//       <div className="mb-4">
//         <p>Items Price: ₦{itemsPrice.toFixed(2)}</p>
//         <p>Shipping Price: ₦{shippingPrice.toFixed(2)}</p>
//         <p>Tax Price: ₦{taxPrice.toFixed(2)}</p>
//         <p className="font-bold">Total Price: ₦{totalPrice.toFixed(2)}</p>
//       </div>

//       <button
//         disabled={loading || cartItems.length === 0}
//         onClick={payWithPaystack}
//         className={`mt-6 px-6 py-3 rounded text-white ${
//           loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
//         }`}
//       >
//         {loading ? 'Processing...' : 'Pay with Paystack'}
//       </button>
//     </div>
//   );
// };

// export default PlaceOrderPage;


import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PaystackPop from '@paystack/inline-js';
import axios from 'axios';
import { clearCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';

const PlaceOrderPage = () => {
  const [loading, setLoading] = useState(false);
  // const [order, setOrder] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const { shippingAddress } = useSelector((state) => state.shipping);

  // Calculate prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 500;
  const taxPrice = 0.075 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  

  // Check if user has shipping address
  useEffect(() => {
    if (!user?.shippingAddress?.address) {
      toast.error('Please add a shipping address');
      navigate('/shipping');
    }
  }, [user, navigate]);

// const payWithPaystack = async () => {
//   setLoading(true);
//   try {
//     // 1. Create order first
//     const { data: createdOrder } = await axios.post(
//       `${import.meta.env.VITE_API_URL}/orders`,
//       {
//         orderItems: cartItems.map(item => ({
//           product: item._id,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.price,
//           image: item.image
//         })),
//         shippingAddress: user.shippingAddress,
//         paymentMethod: 'Paystack',
//         itemsPrice,
//         shippingPrice,
//         taxPrice,
//         totalPrice
//       },
//       { headers: { Authorization: `Bearer ${user.token}` } }
//     );

//     // 2. Initialize Paystack payment
//     const { data: paymentData } = await axios.post(
//       `${import.meta.env.VITE_API_URL}/paystack/initialize`,
//       {
//         email: user.email,
//         amount: Math.round(totalPrice * 100),
//         metadata: {
//           orderId: createdOrder._id // Critical for reconciliation
//         },
//         callback_url: `${window.location.origin}/order/${createdOrder._id}`
//       }
//     );

//     // 3. Update order with payment reference
//     await axios.put(
//       `${import.meta.env.VITE_API_URL}/orders/${createdOrder._id}/payment`,
//       { reference: paymentData.reference },
//       { headers: { Authorization: `Bearer ${user.token}` } }
//     );

//     // 4. Open Paystack widget
//     const paystack = new PaystackPop();
//     paystack.newTransaction({
//       key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
//       email: user.email,
//       amount: Math.round(totalPrice * 100),
//       reference: paymentData.reference,
//       onSuccess: () => verifyPayment(createdOrder._id),
//         onCancel: () => toast.info('Payment cancelled')
//     });

//   } catch (error) {
//     console.error('Payment error:', error);
//     toast.error(error.response?.data?.message || 'Payment failed');
//   } finally {
//     setLoading(false);
//   }
// };
//   const verifyPayment = async (orderId) => {
//     try {
//       // Verify payment with backend
//       const { data: verifiedOrder } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/orders/${orderId}/verify`,
//         {
//           headers: {
//             Authorization: `Bearer ${user.token}`,
//           },
//         }
//       );

//       if (verifiedOrder.isPaid) {
//         dispatch(clearCart());
//         toast.success('Payment successful!');
//         navigate(`/order/${orderId}`);
//       } else {
//         toast.warning('Payment verification pending...');
//         // Poll for payment status
//         setTimeout(() => verifyPayment(orderId), 3000);
//       }
//     } catch (error) {
//       console.error('Verification error:', error);
//       toast.error('Payment verification failed');
//     }
//   };

const payWithPaystack = async () => {
  setLoading(true);

  try {
    // 1. Create order
    const { data: createdOrder } = await axios.post(
      `${import.meta.env.VITE_API_URL}/orders`,
      {
        orderItems: cartItems.map(item => ({
          product: item._id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          image: item.image
        })),
        shippingAddress: user.shippingAddress,
        paymentMethod: 'Paystack',
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    );

    // 2. Initialize Paystack payment
    const { data: paymentData } = await axios.post(
      `${import.meta.env.VITE_API_URL}/paystack/initialize`,
      {
        email: user.email,
        amount: Math.round(totalPrice * 100),
        metadata: {
          orderId: createdOrder._id
        },
        callback_url: `${window.location.origin}/order/${createdOrder._id}`
      }
    );

    // 3. Update order with payment reference
    await axios.put(
      `${import.meta.env.VITE_API_URL}/orders/${createdOrder._id}/payment`,
      { reference: paymentData.reference },
      {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    );

    // 4. Open Paystack widget
    const paystack = new PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: Math.round(totalPrice * 100),
      reference: paymentData.reference,
      onSuccess: () => {
        toast.success('Payment successful!');
        dispatch(clearCart());
        navigate('/');
      },
      onCancel: () => toast.info('Payment cancelled')
    });

  } catch (error) {
    console.error('Payment error:', error);
    toast.error(error.response?.data?.message || 'Payment failed');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Place Order</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        
        <div className="space-y-2 mb-4">
          <div className="flex justify-between">
            <span>Items ({cartItems.length}):</span>
            <span>₦{itemsPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping:</span>
            <span>₦{shippingPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (7.5%):</span>
            <span>₦{taxPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-bold">
            <span>Total:</span>
            <span>₦{totalPrice.toFixed(2)}</span>
          </div>
        </div>

        <div className="mb-6">
  <h3 className="font-semibold mb-2">Shipping Address</h3>
  {user?.shippingAddress ? (
     <p>
          {shippingAddress?.address}, {shippingAddress?.city},{' '}
          {shippingAddress?.postalCode}, {shippingAddress?.country},{shippingAddress?.phone}
        </p>
  ) : (
    <p className="text-red-500">No shipping address provided</p>
  )}
</div>

        <button
          onClick={payWithPaystack}
          disabled={loading || cartItems.length === 0}
          className={`w-full py-3 px-4 rounded-md text-white font-medium ${
            loading || cartItems.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {loading ? 'Processing Payment...' : 'Pay with Paystack'}
        </button>
      </div>
    </div>
  );
};

export default PlaceOrderPage;