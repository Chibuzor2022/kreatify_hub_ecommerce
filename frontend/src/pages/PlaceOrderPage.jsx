// React and Redux hooks
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Paystack SDK and helpers
import PaystackPop from '@paystack/inline-js';
import axios from 'axios';
import { clearCart } from '../slices/cartSlice';
import { toast } from 'react-toastify';
import { apiSlice } from '../slices/apiSlice';

const PlaceOrderPage = () => {
  // Local loading state for payment processing
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Accessing global Redux states
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const { shippingAddress } = useSelector((state) => state.shipping);

  // Redirect to shipping if shipping address is missing
  useEffect(() => {
    if (!shippingAddress || !shippingAddress.address) {
      toast.error('Shipping address is required');
      navigate('/shipping');
    }
  }, [shippingAddress, navigate]);

  // Calculate order prices
  const itemsPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shippingPrice = itemsPrice > 1000 ? 0 : 500; // Free shipping over ₦1000
  const taxPrice = 0.075 * itemsPrice; // 7.5% tax
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  // Payment function using Paystack
  const payWithPaystack = async () => {
    setLoading(true);

    try {
      // 1. Create order on backend
      console.log('Cart items before order:', cartItems);

      const { data: createdOrder } = await axios.post(
        `${import.meta.env.VITE_API_URL}/orders`,
        {
          orderItems: cartItems.map((item) => ({
            product: item._id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            image: item.image,
          })),
          shippingAddress,
          paymentMethod: 'Paystack',
          itemsPrice,
          shippingPrice,
          taxPrice,
          totalPrice,
        },
        {
          // headers: {
          //   Authorization: `Bearer ${user.token}`,
          // },
          withCredentials: true, // Ensure cookies are sent for session management
        }
      );

      // 2. Initialize Paystack transaction
      const { data: paymentData } = await axios.post(
        `${import.meta.env.VITE_API_URL}/paystack/initialize`,
        {
          email: user.email,
          amount: Math.round(totalPrice * 100), // in kobo
          metadata: { orderId: createdOrder._id },
          callback_url: `${window.location.origin}/order/${createdOrder._id}`,
        }
      );

      // 3. Save the payment reference to backend for tracking
      // await axios.put(
      //   `${import.meta.env.VITE_API_URL}/orders/${createdOrder._id}/payment`,
      //   { reference: paymentData.reference },
      //   {
      //     headers: {
      //       Authorization: `Bearer ${user.token}`,
      //     },
      //   }
      // );


      await axios.put(
        `${import.meta.env.VITE_API_URL}/orders/${createdOrder._id}/payment`,
        { reference: paymentData.reference },
        {
          withCredentials: true,
        
        }
      );

      // 4. Launch Paystack UI
      const paystack = new PaystackPop();
      paystack.newTransaction({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
        email: user.email,
        amount: Math.round(totalPrice * 100),
        reference: paymentData.reference,
        onSuccess: () => {
          toast.success('Payment successful!');
          dispatch(clearCart()); // Clear cart after payment
          dispatch(apiSlice.util.invalidateTags(['MyOrders'])); // Refetch user orders
          navigate('/'); // Redirect to homepage
        },
        onCancel: () => toast.info('Payment cancelled'), // Optional cancel handler
      });

    } catch (error) {
      // Handle errors gracefully
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

        {/* Order details section */}
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

        {/* Shipping address display */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p>
            {shippingAddress?.address}, {shippingAddress?.city},{' '}
            {shippingAddress?.postalCode}, {shippingAddress?.country},{' '}
            {shippingAddress?.phone}
          </p>
        </div>

        {/* Pay button */}
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







