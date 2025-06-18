// import { useEffect, useState } from "react";
// import axios from "axios";
// import ProductCard from "../components/ProductCard";
// import Loader from "../components/Loader";
// import ErrorMessage from "../components/ErrorMessage";
// import Pagination from "../components/Pagination";

// const AllProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   const [page, setPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1); // <-- New state
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchProducts = async (currentPage) => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(
//         `${import.meta.env.VITE_API_URL}/products?page=${currentPage}`
//       );

//       setProducts(data.products); // assuming your backend returns { products: [], page, pages }
//       setTotalPages(data.pages || 1);
//       setError("");
//     } catch (err) {
//       setError(err.response?.data?.message || err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProducts(page);
//   }, [page]);

//   const handlePageChange = (newPage) => {
//     setPage(newPage);
//   };

//   return (
//     <>
//       <div className="px-4 py-6 max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Product List</h1>

//         {loading ? (
//           <Loader />
//         ) : error ? (
//           <ErrorMessage message={error} />
//         ) : (
//           <>
//             <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//               {products.map((product) => (
//                 <ProductCard key={product._id} product={product} />
//               ))}
//             </div>

//             <Pagination
//               page={page}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </>
//         )}
//       </div>
//     </>
//   );
// };

// export default AllProductsPage;
import { useState } from "react";
import ProductCard from "../components/ProductCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import Pagination from "../components/Pagination";
import { useGetProductsQuery } from "../slices/productApiSlice.js";

const AllProductsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetProductsQuery({ pageNumber: page });

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <div className="px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Product List</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error?.data?.message || error.message} />
      ) : (
        <>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          <Pagination
            page={data.page}
            totalPages={data.pages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default AllProductsPage;
