import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser, FaBars, FaTimes } from 'react-icons/fa';
import { logout } from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserDropdown from './UserDropdown';
import AdminDropdown from './AdminDropdown';
import { motion, AnimatePresence } from 'framer-motion';
void motion; // prevents unused import warning

const Header = () => {
  // Get cart items and user info from Redux store
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // controls mobile menu state

  // Handles user logout logic
  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`);
      dispatch(logout());
      dispatch(clearCart());
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
      console.error(error);
    }
  };

  // Calculate total number of items in the cart
  const totalCartItems = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0
  );

  // Animation variants for dropdown items
  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };

  return (
    <header className="bg-gray-900 text-white shadow-md fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto px-2 py-3">
        {/* Header Layout */}
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white font-bold text-2xl">
            Kreatify Hub
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center gap-6">
            <SearchBox />

            {/* Navigation links */}
            <Link
              to="/allproducts"
              className="hover:text-green-400 whitespace-nowrap"
            >
              Products
            </Link>
            <Link
              to="/about"
              className="hover:text-green-400 whitespace-nowrap"
            >
              About Us
            </Link>

            {/* Cart icon with item count */}
            <Link
              to="/cart"
              className="relative flex items-center gap-1 hover:text-green-400"
            >
              <FaShoppingCart />
              Cart
              {totalCartItems > 0 && (
                <span className="inline-block bg-green-600 text-black text-xs font-semibold px-2 py-1 rounded-full">
                  {totalCartItems}
                </span>
              )}
            </Link>

            {/* If user is logged in, show dropdown; otherwise show login link */}
            {user ? (
              <UserDropdown name={user.name} onLogout={handleLogout} />
            ) : (
              <Link
                to="/login"
                className="flex items-center gap-3 hover:text-green-400 whitespace-nowrap"
              >
                <FaUser />
                Sign In/Sign Up
              </Link>
            )}

            {/* Admin dropdown if user is admin */}
            {user?.isAdmin && <AdminDropdown />}
          </div>

          {/* Mobile menu toggle button */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile search box */}
        <div className="mt-3 md:hidden">
          <SearchBox />
        </div>

        {/* Mobile dropdown menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden backdrop-blur-sm bg-white/10 p-4 rounded-lg"
            >
              <div className="flex flex-col space-y-3">
                {/* Navigation links */}
                {[
                  { to: '/allproducts', label: 'Products' },
                  { to: '/about', label: 'About Us' },
                ].map((item, i) => (
                  <motion.div
                    key={item.to}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={itemVariants}
                  >
                    <Link
                      to={item.to}
                      className="hover:text-green-400 block whitespace-nowrap"
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Cart link */}
                <motion.div
                  custom={2}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={itemVariants}
                >
                  <Link
                    to="/cart"
                    className="flex items-center gap-1 hover:text-green-400"
                  >
                    <FaShoppingCart />
                    Cart
                    {totalCartItems > 0 && (
                      <span className="ml-1 bg-green-600 text-black text-xs font-semibold px-2 py-1 rounded-full">
                        {totalCartItems}
                      </span>
                    )}
                  </Link>
                </motion.div>

                {/* Auth section */}
                <motion.div
                  custom={3}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={itemVariants}
                >
                  {user ? (
                    <UserDropdown name={user.name} onLogout={handleLogout} />
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center gap-1 hover:text-green-400 whitespace-nowrap"
                    >
                      <FaUser />
                      Sign In/Sign Up
                    </Link>
                  )}
                </motion.div>

                {/* Admin section */}
                {user?.isAdmin && (
                  <motion.div
                    custom={4}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={itemVariants}
                  >
                    <AdminDropdown />
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};

export default Header;



