import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded-2xl p-4 shadow hover:shadow-lg transition">
      <Link to={`/product/${product._id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />
        <h2 className="text-lg font-semibold truncate">{product.name}</h2>
        <p className="text-gray-500">${product.price.toFixed(2)}</p>
      </Link>
    </div>
  );
};

export default ProductCard;

