

// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { useSelector, useDispatch } from 'react-redux';
// import { FaShoppingCart, FaUser } from 'react-icons/fa';
// import { logout} from '../slices/authSlice';
// import { clearCart } from '../slices/cartSlice';
// import SearchBox from './SearchBox';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import UserDropdown from "./UserDropdown";
// import AdminDropdown from "./AdminDropdown";

// const Header = () => {
//   const { cartItems } = useSelector((state) => state.cart);
//   const { user } = useSelector((state) => state.auth);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       // await axios.post('/users/logout');
//         await axios.post(
//       `${import.meta.env.VITE_API_URL}/users/logout`);

//       dispatch(logout());
//       dispatch(clearCart()); // ✅ Clear cart from Redux + localStorage
//       toast.success('Logged out successfully');
//       navigate('/');
//     } catch (error) {
//       toast.error('Logout failed');
//       console.error(error);
//     }
//   };

//   const totalCartItems = cartItems.reduce(
//     (acc, item) => acc + Number(item.quantity || 0),
//     0
//   );

//   return (
//     <>
//      <header className="bg-gray-900 text-white shadow-md">
//       <nav className="container mx-auto px-4 flex items-center justify-between py-4 flex-wrap">
//         <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
//           {/* <img src={logo} alt="kreatify" className="w-10 h-10" /> */}
//           Kreatify Hub
//         </Link>

//         <div className="flex items-center space-x-6 mt-4 md:mt-0">
//           <div >
//          <SearchBox />

//           </div>
         
//             <Link to={"/allproducts"} >Products</Link>
//             <Link to={"/about"} >About Us</Link>

//           <Link to="/cart" className="relative flex items-center  gap-1 hover:text-green-400">
//             <FaShoppingCart />
//             Cart
//             {totalCartItems > 0 && (
//               <span className="inline-block bg-green-600 text-black text-xs font-semibold px-2 py-1 rounded-full">
//                 {totalCartItems}
//               </span>
//             )}
//           </Link>

            
//         {user ? (
//   <UserDropdown name={user.name} onLogout={handleLogout} />
// ) : (
//   <Link to="/login" className="relative flex items-center text-white gap-1 hover:text-green-400">
//     <FaUser />
//     Sign In/Sign Up
//   </Link>
// )}
                    
//           {user?.isAdmin && <AdminDropdown />}
//         </div>
//       </nav>
//       </header>
//       </>
//   );
// };

// export default Header;

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
import { motion, AnimatePresence } from 'framer-motion'; // Framer Motion for animation
// import { AnimatePresence } from 'framer-motion'; // Framer Motion for animation

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu

  // Logout handler
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

  // Total cart quantity
  const totalCartItems = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0
  );

  // Animation config for menu items
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
    <header className="bg-gray-800 text-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        {/* Top section: Logo, Search, Hamburger */}
        <div className="flex justify-between items-center flex-wrap gap-y-4">
          <Link to="/" className="text-white font-bold text-2xl">
            Kreatify Hub
          </Link>

          {/* SearchBox */}
          <div className="w-full md:w-auto">
            <SearchBox />
          </div>

          {/* Hamburger toggle */}
          <button
            className="md:hidden text-white text-2xl"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
            
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden backdrop-blur-sm bg-white/10 p-4 pb-2 rounded-lg"
            >
              <div className="flex flex-col space-y-3">
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
                    <Link to={item.to} className="hover:text-green-400 block">
                      {item.label}
                    </Link>
                  </motion.div>
                ))}

                {/* Cart */}
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

                {/* Auth/User */}
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
                      className="flex items-center gap-1 hover:text-green-400"
                    >
                      <FaUser />
                      Sign In/Sign Up
                    </Link>
                  )}
                </motion.div>

                {/* Admin */}
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

        {/* DESKTOP MENU */}
        <div className="hidden md:flex md:items-center md:space-x-6 mt-4 md:mt-0">
          <Link to="/allproducts" className="hover:text-green-400">Products</Link>
          <Link to="/about" className="hover:text-green-400">About Us</Link>

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

          {user ? (
            <UserDropdown name={user.name} onLogout={handleLogout} />
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1 hover:text-green-400"
            >
              <FaUser />
              Sign In/Sign Up
            </Link>
          )}

          {user?.isAdmin && <AdminDropdown />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
