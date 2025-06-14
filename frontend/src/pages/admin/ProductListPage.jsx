import React, { useEffect } from 'react';
import { Link} from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import {
  useGetProductsQuery,
  useCreateProductMutation,
  useDeleteProductMutation,
} from '../../slices/productApiSlice';

const ProductListPage = () => {
  // const navigate = useNavigate();

  // Fetch products
  const {
    data: products,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductsQuery();

  // Create product
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  // Delete product
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

  useEffect(() => {
    if (error) {
      toast.error(error?.data?.message || 'Error fetching products');
    }
  }, [error]);

 const handleCreate = async () => {
  if (window.confirm('Are you sure you want to create a new product?')) {
    try {
      const response = await createProduct().unwrap();

      if (response && response._id) {
        toast.success('Product created');
        // navigate(`/admin/product/${response._id}/edit`);
        refetch();
      } else {
        toast.error('Invalid response from server');
      }
    } catch (err) {
      toast.error(err?.data?.message || 'Failed to create product');
    }
  }
};


  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id).unwrap();
        toast.success('Product deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || 'Failed to delete product');
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button
          onClick={handleCreate}
          className="flex items-center bg-green-400 text-white font-bold px-4 py-2 rounded hover:bg-green-500 transition cursor-pointer"
        >
          <FaPlus className="mr-2" /> Create Product
        </button>
      </div>

      {isLoading || loadingCreate || loadingDelete ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : isError ? (
        <div className="text-center text-red-600">Failed to load products</div>
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
                  <td className="py-2 px-4 text-sm">{product.image}</td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">${product.price}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">{product.brand}</td>
                  <td className="py-2 px-4">{product.countInStock}</td>
                  <td className="py-2 px-4 flex space-x-2">
                    <Link
                      to={`/admin/product/${product._id}/edit`}
                      className="text-green-600 hover:text-green-800 transition"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="text-red-600 hover:text-red-800 transition cursor-pointer"
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
  );
};

export default ProductListPage;


// import React, { useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
// import {
//   useGetProductsQuery,
//   useDeleteProductMutation,
// } from '../../slices/productApiSlice';

// const ProductListPage = () => {
//   const navigate = useNavigate();

//   // Fetch products
//   const {
//     data: products,
//     isLoading,
//     isError,
//     error,
//     refetch,
//   } = useGetProductsQuery();

//   // Delete product
//   const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();

//   useEffect(() => {
//     if (error) {
//       toast.error(error?.data?.message || 'Error fetching products');
//     }
//   }, [error]);

//   const handleCreate = () => {
//     navigate('/admin/productcreate');
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('Are you sure you want to delete this product?')) {
//       try {
//         await deleteProduct(id).unwrap();
//         toast.success('Product deleted');
//         refetch();
//       } catch (err) {
//         toast.error(err?.data?.message || 'Failed to delete product');
//       }
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex items-center justify-between mb-4">
//         <h1 className="text-2xl font-bold">Products</h1>
//         <button
//           onClick={handleCreate}
//           className="flex items-center bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//         >
//           <FaPlus className="mr-2" /> Create Product
//         </button>
//       </div>

//       {isLoading || loadingDelete ? (
//         <div className="text-center text-gray-600">Loading...</div>
//       ) : isError ? (
//         <div className="text-center text-red-600">Failed to load products</div>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="py-3 px-4 text-left">ID</th>
//                 <th className="py-3 px-4 text-left">Name</th>
//                 <th className="py-3 px-4 text-left">Price</th>
//                 <th className="py-3 px-4 text-left">Category</th>
//                 <th className="py-3 px-4 text-left">Brand</th>
//                 <th className="py-3 px-4 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {products.map((product) => (
//                 <tr key={product._id} className="border-t hover:bg-gray-50">
//                   <td className="py-2 px-4 text-sm">{product._id}</td>
//                   <td className="py-2 px-4">{product.name}</td>
//                   <td className="py-2 px-4">${product.price}</td>
//                   <td className="py-2 px-4">{product.category}</td>
//                   <td className="py-2 px-4">{product.brand}</td>
//                   <td className="py-2 px-4 flex space-x-2">
//                     <Link
//                       to={`/admin/product/${product._id}/edit`}
//                       className="text-green-600 hover:text-green-800 transition"
//                     >
//                       <FaEdit />
//                     </Link>
//                     <button
//                       onClick={() => handleDelete(product._id)}
//                       className="text-red-600 hover:text-red-800 transition"
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
//     </div>
//   );
// };

// export default ProductListPage;
