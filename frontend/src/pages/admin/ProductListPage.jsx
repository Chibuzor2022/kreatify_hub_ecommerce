// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import {
//   useGetProductsQuery,
//   useCreateProductMutation,
//   useDeleteProductMutation,
// } from '../../slices/productApiSlice';

// const ProductListPage = () => {
//   // Fetch all products with pagination (default to page 1)
//   const {
//     data, // contains { products, page, pages }
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useGetProductsQuery({ pageNumber: 1 }); // You can replace `1` with a state-controlled value

//   // Extract products array safely
//   const products = data?.products || [];
  

//   // Create & Delete product mutations
//   const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
//   const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

//   // Show error toast on error
//   useEffect(() => {
//     if (isError && error) {
//       toast.error(error?.data?.message || 'Error fetching products');
//     }
//   }, [isError, error]);

//   // Handle create product
//   const handleCreate = async () => {
//     if (window.confirm('Are you sure you want to create a new product?')) {
//       try {
//         const response = await createProduct().unwrap();
//         if (response && response._id) {
//           toast.success('Product created');
//           refetch(); // Refresh list
//         } else {
//           toast.error('Invalid response from server');
//         }
//       } catch (err) {
//         toast.error(err?.data?.message || 'Failed to create product');
//       }
//     }
//   };

//   // Handle delete product
//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await deleteProduct(id).unwrap();
//         toast.success('Product deleted');
//         refetch(); // Refresh list
//       } catch (err) {
//         toast.error(err?.data?.message || 'Failed to delete product');
//       }
//     }
//   };
  

//   return (
    
//     <div className="p-6">
//       {/* Header and create button */}
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Products</h1>
//         <button
//           onClick={handleCreate}
//           className="flex items-center bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600"
//         >
//           <FaPlus className="mr-2" /> Create Product
//         </button>
//       </div>

//       {/* Loading & error states */}
//       {isLoading || loadingCreate || loadingDelete ? (
//         <div className="text-center text-gray-600">Loading...</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-4 text-left">ID</th>
//                 <th className="py-3 px-4 text-left">Image</th>
//                 <th className="py-3 px-4 text-left">Name</th>
//                 <th className="py-3 px-4 text-left">Price</th>
//                 <th className="py-3 px-4 text-left">Category</th>
//                 <th className="py-3 px-4 text-left">Brand</th>
//                 <th className="py-3 px-4 text-left">Count in Stock</th>
//                 <th className="py-3 px-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id} className="border-t hover:bg-gray-50">
//                   <td className="py-2 px-4 text-sm">{product._id}</td>
//                   <td className="py-2 px-4 text-sm">
//                     {product.images && product.images.length > 0 ? (
//                       <img
//                         src={product.images[0]}
//                         alt="product"
//                         className="w-12 h-12 object-cover rounded"
//                       />
//                     ) : (
//                       <span className="text-gray-400 italic">No Image</span>
//                     )}
//                   </td>
//                   <td className="py-2 px-4">{product.name}</td>
//                   <td className="py-2 px-4">₦{product.price}</td>
//                   <td className="py-2 px-4">{product.category}</td>
//                   <td className="py-2 px-4">{product.brand}</td>
//                   <td className="py-2 px-4">{product.countInStock}</td>
//                   <td className="py-2 px-4 flex space-x-2">
//                     <Link
//                       to={`/admin/product/${product._id}/edit`}
//                       className="text-green-600 hover:text-green-800"
//                     >
//                       <FaEdit />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(product._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//        </div>
//   );
// };

// export default ProductListPage;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Pagination from "../../components/Pagination";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productApiSlice';

const ProductListPage = () => {
  // State for pagination
  const [page, setPage] = useState(1);
  
  // Fetch products with pagination
  const { 
    data, 
    isLoading, 
    error, 
    isError, 
    refetch 
  } = useGetProductsQuery({ pageNumber: page });

  // Create & Delete product mutations
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  // Extract products array safely
  const products = data?.products || [];
  const totalPages = data?.pages || 1;
  const currentPage = data?.page || 1;

  // Show error toast on error
  useEffect(() => {
    if (isError && error) {
      toast.error(error?.data?.message || 'Error fetching products');
    }
  }, [isError, error]);

  // Handle create product
  const handleCreate = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const response = await createProduct().unwrap();
        if (response && response._id) {
          toast.success('Product created');
          refetch(); // Refresh list
        } else {
          toast.error('Invalid response from server');
        }
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to create product');
      }
    }
  };

  // Handle delete product
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Product deleted');
        refetch(); // Refresh list
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to delete product');
      }
    }
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <div className="p-6 mt-14">
        {/* Header and create button */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Products</h1>
          <button
            onClick={handleCreate}
            className="flex items-center bg-green-500 text-white font-semibold px-4 py-2 rounded hover:bg-green-600"
            disabled={loadingCreate}
          >
            <FaPlus className="mr-2" /> 
            {loadingCreate ? 'Creating...' : 'Create Product'}
          </button>
        </div>

        {/* Loading & error states */}
        {isLoading || loadingCreate || loadingDelete ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-3 px-4 text-left">ID</th>
                  <th className="py-3 px-4 text-left">Image</th>
                  <th className="py-3 px-4 text-left">Name</th>
                  <th className="py-3 px-4 text-left">Price</th>
                  <th className="py-3 px-4 text-left">Category</th>
                  <th className="py-3 px-4 text-left">Brand</th>
                  <th className="py-3 px-4 text-left">Count in Stock</th>
                  <th className="py-3 px-4 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-4 text-sm">{product._id}</td>
                    <td className="py-2 px-4 text-sm">
                      {product.images && product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt="product"
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No Image</span>
                      )}
                    </td>
                    <td className="py-2 px-4">{product.name}</td>
                    <td className="py-2 px-4">₦{product.price}</td>
                    <td className="py-2 px-4">{product.category}</td>
                    <td className="py-2 px-4">{product.brand}</td>
                    <td className="py-2 px-4">{product.countInStock}</td>
                    <td className="py-2 px-4 flex space-x-2">
                      <Link
                        to={`/admin/product/${product._id}/edit`}
                        className="text-green-600 hover:text-green-800"
                      >
                        <FaEdit />
                      </Link>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="text-red-600 hover:text-red-800"
                        disabled={loadingDelete}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Pagination - Only show if there are multiple pages */}
      {totalPages > 1 && (
        <div className="px-6 pb-6">
          <Pagination
            page={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default ProductListPage;