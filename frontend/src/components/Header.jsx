

import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { logout} from '../slices/authSlice';
import { clearCart } from '../slices/cartSlice';
import SearchBox from './SearchBox';
import axios from 'axios';
import { toast } from 'react-toastify';
import UserDropdown from "./UserDropdown";
import AdminDropdown from "./AdminDropdown";
import SliderNav from './SliderNav';

const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // await axios.post('/users/logout');
        await axios.post(
      `${import.meta.env.VITE_API_URL}/users/logout`);

      dispatch(logout());
      dispatch(clearCart()); // ✅ Clear cart from Redux + localStorage
      toast.success('Logged out successfully');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed');
      console.error(error);
    }
  };

  const totalCartItems = cartItems.reduce(
    (acc, item) => acc + Number(item.quantity || 0),
    0
  );

  return (
    <>
    <SliderNav/>
     <header className="bg-gray-900 text-white shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between py-4 flex-wrap">
        <Link to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          {/* <img src={logo} alt="kreatify" className="w-10 h-10" /> */}
          Kreatify Hub
        </Link>

        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <div >
         <SearchBox />

          </div>
         
            <Link to={"/allproducts"} >Products</Link>
            <Link to={"/about"} >About Us</Link>

          <Link to="/cart" className="relative flex items-center  gap-1 hover:text-green-400">
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
  <Link to="/login" className="relative flex items-center text-white gap-1 hover:text-green-400">
    <FaUser />
    Sign In/Sign Up
  </Link>
)}
                    
          {user?.isAdmin && <AdminDropdown />}
        </div>
      </div>
      </header>
      </>
  );
};

export default Header;

