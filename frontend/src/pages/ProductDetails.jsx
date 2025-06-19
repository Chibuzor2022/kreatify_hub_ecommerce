import React, { useEffect, useState } from 'react';
import { useParams} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';
import ProductImageCarousel from '../components/ProductImageCarousel';
import { toast } from 'react-toastify'; // Make sure this is at the top

function ProductDetails() {
  const { id } = useParams();
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

const handleIncrement = () => {
  if (product && quantity < product.countInStock) {
    setQuantity((prevQuantity) => Number(prevQuantity) + 1);
  }
};

const handleDecrement = () => {
  setQuantity((prevQuantity) =>
    Number(prevQuantity) > 1 ? Number(prevQuantity) - 1 : 1
  );
};



const handleAddToCart = () => {
  dispatch(addToCart({ ...product, quantity: Number(quantity) }));
  toast.success(`${product.name} added to cart`);
};


  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">



      <ProductImageCarousel images={product.images.length > 0 ? product.images : [product.image]} />


        <div className="flex-1 mt-19">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-xl font-semibold mb-2">Price: ₦{product.price}</p>
          <p className="mb-4">
            {product.countInStock > 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-red-600">Out of Stock</span>
            )}
          </p>
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

