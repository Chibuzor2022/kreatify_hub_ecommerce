// // Import React and hooks for state management and navigation
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { saveShippingAddress } from '../slices/shippingSlice'; // Redux action to save shipping info
import { useNavigate } from 'react-router-dom';

const ShippingPage = () => {
  const dispatch = useDispatch(); // Hook to dispatch Redux actions
  const navigate = useNavigate(); // Hook to programmatically navigate to another page

  // Local state to hold input field values
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default browser reload behavior
    // Dispatch the shipping information to Redux store
    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
        phone,
      })
    );
    // Navigate to the place order page
    navigate('/placeorder');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-md p-8">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Shipping Information
        </h2>

        {/* Shipping form */}
        <form onSubmit={submitHandler} className="space-y-5">

          {/* Address input */}
          <div>
            <input
              type="text"
              placeholder="Address"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          {/* City input */}
          <div>
            <input
              type="text"
              placeholder="City"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          {/* Postal code input */}
          <div>
            <input
              type="text"
              placeholder="Postal Code"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              required
            />
          </div>

          {/* Country input */}
          <div>
            <input
              type="text"
              placeholder="Country"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </div>

          {/* Phone number input */}
          <div>
            <input
              type="text"
              placeholder="Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-200"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShippingPage;
