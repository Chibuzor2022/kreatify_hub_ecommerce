// Import necessary hooks and utilities
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slices/authSlice"; 
import { useNavigate, Link } from "react-router-dom"; 

// Functional component for user registration
export default function Register() {
  // Local state for form input fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch(); 
  const navigate = useNavigate(); 

  // Extract auth-related state from Redux store
  const { user, loading, error } = useSelector((state) => state.auth);

  // If user is already logged in, redirect to homepage
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  // Handle form submission
  const submitHandler = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    dispatch(registerUser({ name, email, phone, password })); // Dispatch register action
  };

  return (
    <div className="my-20 flex items-center justify-center bg-gradient-to-tr from-gray-50 to-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">
          Create Account
        </h1>

        {/* Show error message if registration fails */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded px-4 py-2">
            {error}
          </div>
        )}

        {/* Registration form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* Full Name Input */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Your Name"
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="you@example.com"
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Phone</label>
            <input
              type="text"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="+234..."
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block mb-1 font-semibold text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="••••••••"
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>

        {/* Link to login page if user already has an account */}
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-blue-600 font-medium hover:underline"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}
