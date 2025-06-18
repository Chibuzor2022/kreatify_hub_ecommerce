import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart } from '../slices/cartSlice';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems } = useSelector((state) => state.cart);

  const handleQtyChange = (item, delta) => {
    const newQty = item.quantity + delta;
    if (newQty < 1) return;
    if (newQty > item.countInStock) return toast.error('Not enough stock');
    dispatch(addToCart({ ...item, quantity: newQty }));
  };

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
    toast.info('Item removed from cart');
  };

  const handleCheckout = () => {
    navigate('/login?redirect=/shipping');
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">

          
      {/* Left - Cart Items */}
      <div className="w-full md:w-3/4">
        <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

        <button className='bg-green-500 rounded text-white mb-4 py-3 px-4 font-semibold'>
          <Link to={'/'}>Continue Shopping</Link>
       </button>
        {cartItems.length === 0 ? (
          <p>Your cart is empty. <Link to="/" className="text-green-600">Go shopping</Link></p>
        ) : (
          <table className="min-w-full bg-white rounded shadow-md overflow-hidden">
            <thead className="bg-gray-500">
              <tr>
                <th className="px-4 py-2 text-left">Item</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-center">Subtotal</th>
                <th className="px-4 py-2 text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="border-b">
                  <td className="px-4 py-4 flex items-center gap-4">
                  <img src={item.images[0]} alt={item.name} className="w-16 h-16 object-cover rounded" />
                    <Link to={`/product/${item._id}`} className="font-medium text-blue-700 hover:underline">
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-4 py-4 text-center">₦{item.price.toFixed(2)}</td>
                  <td className="px-4 py-4 text-center">
                    <div className="flex justify-center items-center gap-2">
                      <button
                        onClick={() => handleQtyChange(item, -1)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        <FaMinus />
                      </button>
                      <span className="px-2 w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQtyChange(item, 1)}
                        className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        <FaPlus />
                      </button>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-center">
                    ₦{(item.price * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <button
                      onClick={() => handleRemove(item._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Right - Summary */}
      <div className="w-full md:w-1/4 bg-white rounded-lg shadow-md p-6 h-fit">
        <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
        <div className="flex justify-between mb-2">
          <span>Total Items:</span>
          <span>{totalItems}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span>Total Price:</span>
          <span className="font-bold">₦{totalPrice.toFixed(2)}</span>
        </div>
        <Link to={'/shipping'}>
        
      
        <button
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
          className={`w-full py-3 text-white font-semibold rounded-lg transition-colors ${
            cartItems.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Proceed to Checkout
          </button>
            </Link>
      </div>
    </div>
  );
};

export default CartPage;
