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

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../slices/cartSlice';

// function QuantityControls({ quantity, onIncrement, onDecrement, maxQuantity }) {
//   return (
//     <div className="flex items-center mb-4">
//       <button
//         onClick={onDecrement}
//         className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
//         aria-label="Decrease quantity"
//       >
//         -
//       </button>
//       <span className="px-4 py-1 border-t border-b">{quantity}</span>
//       <button
//         onClick={onIncrement}
//         className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
//         aria-label="Increase quantity"
//         disabled={quantity >= maxQuantity}
//       >
//         +
//       </button>
//     </div>
//   );
// }

// function ProductDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [addedToCart, setAddedToCart] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`/api/products/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch product data');
//         }
//         const data = await response.json();
//         setProduct(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleIncrement = () => {
//     if (product && quantity < product.countInStock) {
//       setQuantity(prev => prev + 1);
//     }
//   };

//   const handleDecrement = () => {
//     setQuantity(prev => (prev > 1 ? prev - 1 : 1));
//   };

//   const handleAddToCart = () => {
//     dispatch(addToCart({ ...product, quantity }));
//     setAddedToCart(true);
//     setTimeout(() => setAddedToCart(false), 3000);
//   };

//   if (loading) return <div className="text-center mt-10">Loading...</div>;
//   if (error) return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
//   if (!product) return <div className="text-center mt-10">Product not found.</div>;

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {addedToCart && (
//         <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
//           Added to cart successfully!
//         </div>
//       )}
      
//       <div className="flex flex-col md:flex-row gap-6">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="w-full md:w-1/2 object-cover rounded"
//           loading="lazy"
//         />
//         <div className="flex-1 mt-19">
//           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
//           <p className="text-gray-700 mb-4">{product.description}</p>
//           <p className="text-xl font-semibold mb-2">Price: ${product.price}</p>
//           <p className="mb-4">
//             Status: {product.countInStock > 0 ? (
//               <span className="text-green-600">In Stock ({product.countInStock} available)</span>
//             ) : (
//               <span className="text-red-600">Out of Stock</span>
//             )}
//           </p>
          
//           {product.countInStock > 0 && (
//             <>
//               <QuantityControls
//                 quantity={quantity}
//                 onIncrement={handleIncrement}
//                 onDecrement={handleDecrement}
//                 maxQuantity={product.countInStock}
//               />
//               <button
//                 className={`px-4 py-2 rounded text-white ${
//                   product.countInStock > 0
//                     ? 'bg-gray-700 hover:bg-gray-600'
//                     : 'bg-gray-400 cursor-not-allowed'
//                 }`}
//                 disabled={product.countInStock === 0}
//                 onClick={handleAddToCart}
//                 aria-label="Add to cart"
//               >
//                 Add to Cart
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { addToCart } from '../slices/cartSlice';

// function QuantityControls({ quantity, onIncrement, onDecrement, maxQuantity }) {
//   // Ensure we always display a valid number
//   const displayQuantity = isNaN(quantity) ? 1 : Math.max(1, quantity);
  
//   return (
//     <div className="flex items-center mb-4">
//       <button
//         onClick={onDecrement}
//         className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
//         aria-label="Decrease quantity"
//         disabled={displayQuantity <= 1}
//       >
//         -
//       </button>
//       <span className="px-4 py-1 border-t border-b border-gray-200">
//         {displayQuantity}
//       </span>
//       <button
//         onClick={onIncrement}
//         className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
//         aria-label="Increase quantity"
//         disabled={displayQuantity >= maxQuantity}
//       >
//         +
//       </button>
//     </div>
//   );
// }

// function ProductDetails() {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [addedToCart, setAddedToCart] = useState(false);

//   useEffect(() => {
//     const fetchProduct = async () => {
//       try {
//         const response = await fetch(`/api/products/${id}`);
//         if (!response.ok) {
//           throw new Error('Failed to fetch product data');
//         }
//         const data = await response.json();
        
//         // Validate numeric fields from API
//         const validatedProduct = {
//           ...data,
//           price: Number(data.price) || 0,
//           countInStock: Number(data.countInStock) || 0
//         };
        
//         setProduct(validatedProduct);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProduct();
//   }, [id]);

//   const handleIncrement = () => {
//     if (product) {
//       const newQuantity = Math.min(Number(quantity) + 1, product.countInStock);
//       if (!isNaN(newQuantity)) {
//         setQuantity(newQuantity);
//       }
//     }
//   };

//   const handleDecrement = () => {
//     const newQuantity = Math.max(Number(quantity) - 1, 1);
//     if (!isNaN(newQuantity)) {
//       setQuantity(newQuantity);
//     }
//   };

//   const handleAddToCart = () => {
//     if (product && !isNaN(quantity)) {
//       dispatch(addToCart({
//         ...product,
//         quantity: Math.max(1, Math.min(quantity, product.countInStock))
//       }));
//       setAddedToCart(true);
//       setTimeout(() => setAddedToCart(false), 3000);
//     }
//   };

//   if (loading) {
//     return <div className="text-center mt-10">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center mt-10 text-red-500">Error: {error}</div>;
//   }

//   if (!product) {
//     return <div className="text-center mt-10">Product not found.</div>;
//   }

//   return (
//     <div className="max-w-4xl mx-auto p-6">
//       {addedToCart && (
//         <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
//           {product.name} (×{quantity}) added to cart!
//         </div>
//       )}
      
//       <div className="flex flex-col md:flex-row gap-8">
//         <div className="w-full md:w-1/2 bg-white p-4 rounded-lg shadow">
//           <img
//             src={product.image}
//             alt={product.name}
//             className="w-full h-auto object-contain rounded"
//             loading="lazy"
//             onError={(e) => {
//               e.target.src = '/images/placeholder-product.png';
//             }}
//           />
//         </div>
        
//         <div className="w-full md:w-1/2">
//           <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
//           <p className="text-gray-700 mb-5">{product.description}</p>
          
//           <div className="mb-5">
//             <span className="text-2xl font-semibold">${product.price.toFixed(2)}</span>
//             <span className={`ml-3 px-2 py-1 text-sm rounded ${
//               product.countInStock > 0
//                 ? 'bg-green-100 text-green-800'
//                 : 'bg-red-100 text-red-800'
//             }`}>
//               {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
//             </span>
//           </div>
          
//           {product.countInStock > 0 && (
//             <>
//               <div className="mb-6">
//                 <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
//                   Quantity
//                 </label>
//                 <QuantityControls
//                   quantity={quantity}
//                   onIncrement={handleIncrement}
//                   onDecrement={handleDecrement}
//                   maxQuantity={product.countInStock}
//                 />
//                 {product.countInStock < 10 && (
//                   <p className="text-sm text-gray-500 mt-1">
//                     Only {product.countInStock} left in stock!
//                   </p>
//                 )}
//               </div>
              
//               <button
//                 onClick={handleAddToCart}
//                 className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow transition-colors"
//                 disabled={product.countInStock === 0}
//               >
//                 Add to Cart
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ProductDetails;

