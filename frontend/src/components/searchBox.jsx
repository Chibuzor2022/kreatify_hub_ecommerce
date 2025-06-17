// import React, { useState } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';

// const SearchBox = () => {
//   const navigate = useNavigate();
//   const { keyword: urlKeyword } = useParams();

//   // Set initial keyword from URL param or empty string
//   const [keyword, setKeyword] = useState(urlKeyword || '');

//   // Handle search submission
//   const submitHandler = (e) => {
//     e.preventDefault();
//     if (keyword.trim()) {
//       navigate(`/search/${keyword.trim()}`);
//       setKeyword('');
//     } else {
//       navigate('/');
//     }
//   };

//   return (
//     <form
//       onSubmit={submitHandler}
//       className="flex items-center space-x-2 ml-4"
//     >
//       {/* Search Input */}
//       <input
//         type="text"
//         name="q"
//         value={keyword}
//         onChange={(e) => setKeyword(e.target.value)}
//         placeholder="Search Products..."
//         className="px-3 py-2 rounded-md text-sm text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
//       />

//       {/* Submit Button */}
//       <button
//         type="submit"
//         className="bg-transparent border border-white text-white px-3 py-2 rounded-md hover:bg-white hover:text-black transition"
//       >
//         Search
//       </button>
//     </form>
//   );
// };

// export default SearchBox;

// components/SearchBox.jsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSearchProductsQuery } from '../slices/productApiSlice';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const [debouncedKeyword, setDebouncedKeyword] = useState('');
  const navigate = useNavigate();

  // Using the search query from productApiSlice
  const { 
    data: products = [], 
    isLoading, 
    isError 
  } = useSearchProductsQuery(debouncedKeyword, {
    skip: debouncedKeyword.trim().length < 2, // Only search when 2+ characters
  });

  // Debounce the search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedKeyword(keyword);
    }, 500);

    return () => clearTimeout(timer);
  }, [keyword]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    }
  };

  const handleProductSelect = (productId) => {
    navigate(`/product/${productId}`);
    setKeyword('');
  };

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            )}
          </button>
        </div>
      </form>

      {/* Search results dropdown */}
      {keyword && !isLoading && (
        <div className="absolute z-10 mt-1 w-full bg-black border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {isError ? (
            <div className="p-3 text-red-500">Error loading results</div>
          ) : products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                // className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                className="cursor-pointer"
                onClick={() => handleProductSelect(product._id)}
              >
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-white">${product.price}</div>
              </div>
            ))
          ) : (
            <div className="p-3 text-gray-500">No products found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;