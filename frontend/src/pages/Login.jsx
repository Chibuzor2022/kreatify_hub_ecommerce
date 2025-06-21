import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import { clearCart } from '../slices/cartSlice';

export default function Login() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get auth state from Redux store
  const { user, loading, error } = useSelector((state) => state.auth);

  // Redirect to homepage and clear cart if login is successful
  useEffect(() => {
    if (user) {
      dispatch(clearCart());
      navigate('/');
    }
  }, [user, navigate, dispatch]);

  // Form submission handler
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 px-4">
      {/* Login card */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Login</h1>

        {/* Display login error */}
        {error && (
          <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-300 rounded px-4 py-2">
            {error}
          </div>
        )}

        {/* Login form */}
        <form onSubmit={submitHandler} className="space-y-5">
          {/* Email input */}
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

          {/* Password input */}
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
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Registration link */}
        <div className="mt-6 text-center text-sm text-gray-600">
          New user?{' '}
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
}
