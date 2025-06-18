// import { Link } from "react-router-dom";

// const ProductCard = ({ product }) => {
//   return (
    
//     <div className="border rounded-2xl p-4 shadow hover:shadow-lg transition">
//       <Link to={`/product/${product._id}`}>
//         <img
//           src={product.images?.[0] || product.image}
//   alt={product.name}
//           className="w-full h-48 object-cover rounded-xl mb-4"
//         />
//         <h2 className="text-lg font-semibold truncate">{product.name}</h2>
//         <p className="text-gray-500">₦{product.price.toFixed(2)}</p>
//       </Link>
//     </div>
    
//   );
// };

// export default ProductCard;

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../slices/cartSlice";
import { toast } from "react-toastify";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="border rounded-2xl p-4 m-5 shadow hover:shadow-lg transition flex flex-col">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.images?.[0] || product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h2 className="text-lg font-semibold truncate">{product.name}</h2>
        <p className="text-gray-500 mb-2">₦{product.price.toFixed(2)}</p>
      </Link>

      <button
        className={`mt-auto px-4 py-2 rounded text-white ${
          product.countInStock > 0
            ? "bg-gray-700 hover:bg-gray-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
        onClick={handleAddToCart}
        disabled={product.countInStock === 0}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
