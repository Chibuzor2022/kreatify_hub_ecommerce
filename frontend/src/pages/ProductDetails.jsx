import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; 
import { useDispatch } from 'react-redux'; 
import { addToCart } from '../slices/cartSlice'; 
import ProductImageCarousel from '../components/ProductImageCarousel'; 
import { toast } from 'react-toastify';
import axios from 'axios'; // Import axios for API requests

function ProductDetails() {
  const { id } = useParams(); // Extract the product ID from the route
  const dispatch = useDispatch();

  // Component state for product data, loading, errors, and quantity
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  // Fetch product data when the component mounts or `id` changes
  useEffect(() => {
    // const fetchProduct = async () => {
    //   try {
    //     const response = await fetch(`/api/products/${id}`);
    //     if (!response.ok) {
    //       throw new Error('Failed to fetch product data');
    //     }
    //     const data = await response.json();
    //     setProduct(data);
    //   } catch (err) {
    //     setError(err.message); // Save error message if fetch fails
    //   } finally {
    //     setLoading(false); // Always stop loading regardless of success/failure
    //   }
    // };
    const fetchProduct = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/products/${id}`,
      { withCredentials: true } // ✅ needed for cookies
    );
    setProduct(response.data);
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to fetch product data');
  } finally {
    setLoading(false);
  }
};
    // Call the fetch function

    fetchProduct();
  }, [id]);

  // Increase quantity (without exceeding available stock)
  const handleIncrement = () => {
    if (product && quantity < product.countInStock) {
      setQuantity((prevQuantity) => Number(prevQuantity) + 1);
    }
  };

  // Decrease quantity (minimum is 1)
  const handleDecrement = () => {
    setQuantity((prevQuantity) =>
      Number(prevQuantity) > 1 ? Number(prevQuantity) - 1 : 1
    );
  };

  // Add product to cart and show success toast
  const handleAddToCart = () => {
    // dispatch(addToCart({ ...product, quantity: Number(quantity) }));
    dispatch(addToCart({ 
      
        ...product,
  image: product.images?.[0] || product.image,
  quantity: Number(quantity)    
    
    }));
    toast.success(`${product.name} added to cart`);
  };

  // Show loading state
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // Show error state
  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  // Handle case where product is not found
  if (!product) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  // Main UI rendering
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">

        {/* Image carousel - use product images or fallback to single image */}
        <ProductImageCarousel images={product.images.length > 0 ? product.images : [product.image]} />

        {/* Product details panel */}
        <div className="flex-1 mt-19">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">Price: ₦{product.price}</p>

          {/* Stock status */}
          <p className="mb-4">
            {product.countInStock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>

          {/* Quantity selector - only show if in stock */}
          {product.countInStock > 0 && (
            <div className="flex items-center mb-4">
              <button
                onClick={handleDecrement}
                className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
              >
                -
              </button>
              <span className="px-4 py-1 border-t border-b">{Number(quantity) || 0}</span>
              <button
                onClick={handleIncrement}
                className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
              >
                +
              </button>
            </div>
          )}

          {/* Add to cart button */}
          <button
            className={`px-4 py-2 rounded text-white ${
              product.countInStock > 0
                ? 'bg-gray-700 hover:bg-gray-400'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
            disabled={product.countInStock === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
