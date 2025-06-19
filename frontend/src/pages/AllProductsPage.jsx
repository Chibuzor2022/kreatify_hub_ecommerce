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
