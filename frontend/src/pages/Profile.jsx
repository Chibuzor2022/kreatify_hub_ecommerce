// Import required hooks and utilities
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../slices/authSlice"; // Redux action to update profile
import { toast } from "react-toastify"; // Toast notifications
import { useNavigate } from "react-router-dom"; // Navigation

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Access auth state from Redux store
  const { user, loading, error } = useSelector((state) => state.auth);

  // Local component state for profile form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null); // To show local validation errors

  // Populate form fields with current user info on load
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setEmail(user.email || '');
      setPhone(user.phone || '');
    }
  }, [user]);

  // Submit handler for the profile update form
  const submitHandler = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      // Dispatch the updateUserProfile action with form data
      await dispatch(updateUserProfile({ name, email, phone, password })).unwrap();

      // Show success message and redirect to homepage
      toast.success("Profile updated successfully");
      navigate("/");
    } catch (err) {
      // Show error message if update fails
      toast.error(err?.message || "Profile update failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 m-10">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Update Profile</h1>

        {/* Display local or server error messages */}
        {message && <p className="mb-4 text-sm text-red-500">{message}</p>}
        {error && <p className="mb-4 text-sm text-red-500">{error}</p>}
        {loading && <p className="mb-4 text-sm text-blue-500">Updating...</p>}

        {/* Profile Update Form */}
        <form onSubmit={submitHandler} className="space-y-5">

          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Password Input (optional) */}
          <div>
            <label className="block text-sm font-medium text-gray-700">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep current"
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200 focus:ring-opacity-50"
              placeholder="Confirm password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            {loading ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}
