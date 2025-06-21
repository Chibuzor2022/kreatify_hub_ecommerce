import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get current user from Redux store
  const { user } = useSelector((state) => state.auth);

  // Handle add-to-cart logic
  const handleAddToCart = () => {
    if (!user) {
      toast.info("Please login to add items to cart."); // Notify user if not logged in
      navigate("/login"); // Redirect to login page
      return;
    }

    // Add product to cart with quantity of 1
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="mt-2 p-4 m-5 border rounded-2xl shadow hover:shadow-lg transition flex flex-col">
      {/* Link to product details page */}
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images?.[0] || product.image} // Show first image if available
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h2 className="text-lg font-semibold truncate">{product.name}</h2>
        <p className="text-gray-500 mb-2">₦{product.price.toFixed(2)}</p>
      </Link>

      {/* Add to Cart button */}
      <button
        className={`cursor-pointer mt-auto px-4 py-2 rounded text-white ${
          product.countInStock > 0
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleAddToCart}
        disabled={product.countInStock === 0} // Disable if out of stock
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
