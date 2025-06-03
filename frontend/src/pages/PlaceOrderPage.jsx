import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PaystackPop from '@paystack/inline-js';
import axios from 'axios';

const PlaceOrderPage = () => {
  const [loading, setLoading] = useState(false);

  // const { cartItems } = useSelector((state) => state.cart);
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const itemsPrice = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const shippingPrice = itemsPrice > 1000 ? 0 : 500; // example: free shipping if > 1000 Naira, else 500 Naira
  const taxPrice = 0.075 * itemsPrice;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;
  const payWithPaystack = async () => {
  setLoading(true);
  try {
    // Initialize transaction on backend
    const { data } = await axios.post('/api/paystack/initialize', {
      email: user.email,
      amount: Math.round(totalPrice * 100), // amount in Kobo
    });

    if (!data.access_code) {
      alert('Payment initialization failed: no access code.');
      setLoading(false);
      return;
    }

    const paystack = new PaystackPop();

    // This returns a Promise that resolves on success or rejects on failure/close
    await paystack.resumeTransaction(data.access_code);

    // alert('Payment Successful!');
    // TODO: create order, verify on backend, redirect user, etc.

  } catch (error) {
    if (error.message === 'User closed the payment modal') {
      alert('Payment was not completed.');
    } else {
      console.error('Payment initialization error:', error);
      alert('Failed to initialize payment. Try again later.');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Place Order</h1>

      <div className="mb-4">
        <p>Items Price: ₦{itemsPrice.toFixed(2)}</p>
        <p>Shipping Price: ₦{shippingPrice.toFixed(2)}</p>
        <p>Tax Price: ₦{taxPrice.toFixed(2)}</p>
        <p className="font-bold">Total Price: ₦{totalPrice.toFixed(2)}</p>
      </div>

      <button
        disabled={loading || cartItems.length === 0}
        onClick={payWithPaystack}
        className={`mt-6 px-6 py-3 rounded text-white ${
          loading ? 'bg-gray-500' : 'bg-green-600 hover:bg-green-700'
        }`}
      >
        {loading ? 'Processing...' : 'Pay with Paystack'}
      </button>
    </div>
  );
};

export default PlaceOrderPage;
