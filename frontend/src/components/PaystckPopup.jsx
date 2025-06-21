import React from 'react';
import PaystackPop from '@paystack/inline-js';
import axios from 'axios';

const PaystackPopup = ({ email, amount }) => {
  const handlePayment = async () => {
    try {
      // Step 1: Initialize transaction on backend
      const res = await axios.post('/api/paystack/initialize', {
        email,
        amount: amount * 100, // kobo
      });

      const { access_code } = res.data;

      // Step 2: Use access_code to open popup
      const paystack = new PaystackPop();
      paystack.newTransaction({
        access_code,
        onSuccess: (response) => {
          console.log('Payment success:', response);
        },
        onCancel: () => {
          console.log('Payment cancelled');
        },
      });
    } catch (err) {
      console.error('Error initializing payment:', err);
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
    >
      Pay with Paystack
    </button>
  );
};

export default PaystackPopup;
