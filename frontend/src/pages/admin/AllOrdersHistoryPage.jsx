
// import { useGetAllOrdersQuery, useDeleteOrderMutation } from "../../slices/productApiSlice";
// import { useNavigate } from "react-router-dom";
// import Loader from "../../components/Loader";
// import ErrorMessage from "../../components/ErrorMessage";
// import { toast } from "react-toastify";
// import { FaTrash, FaEye } from "react-icons/fa";

// const AllOrdersHistoryPage = () => {
//   const navigate = useNavigate();
//   const { data: orders = [], isLoading, error, refetch } = useGetAllOrdersQuery();
//   const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

//   const handleDelete = async (orderId) => {
//     if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
//       try {
//         await deleteOrder(orderId).unwrap();
//         toast.success('Order deleted successfully');
//         refetch(); // Refresh the orders list
//       } catch (err) {
//         toast.error(err?.data?.message || err.message || 'Failed to delete order');
//       }
//     }
//   };

//   return (
//     <div className="max-w-6xl mx-auto p-4">
//       <h1 className="text-2xl font-semibold mb-4">All Orders (Admin)</h1>

//       {isLoading ? (
//         <Loader />
//       ) : error ? (
//         <ErrorMessage message={error?.data?.message || error.message} />
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border text-sm">
//             <thead className="bg-gray-100 text-left">
//               <tr>
//                 <th className="p-3 border">ID</th>
//                 <th className="p-3 border">User</th>
//                 <th className="p-3 border">Date</th>
//                 <th className="p-3 border">Total</th>
//                 <th className="p-3 border">Paid</th>
//                 <th className="p-3 border">Delivered</th>
//                 <th className="p-3 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {orders.map((order) => (
//                 <tr key={order._id} className="border-t hover:bg-gray-50">
//                   <td className="p-3 border">{order._id}</td>
//                   <td className="p-3 border">{order.user?.name || 'Guest'}</td>
//                   <td className="p-3 border">
//                     {new Date(order.createdAt).toLocaleDateString()}
//                   </td>
//                   <td className="p-3 border">₦{order.totalPrice?.toLocaleString() || '0'}</td>
//                   <td className="p-3 border">
//                     {order.isPaid ? (
//                       <span className="text-green-600">Yes</span>
//                     ) : (
//                       <span className="text-red-600">No</span>
//                     )}
//                   </td>
//                   <td className="p-3 border">
//                     {order.isDelivered ? (
//                       <span className="text-green-600">Yes</span>
//                     ) : (
//                       <span className="text-red-600">No</span>
//                     )}
//                   </td>
//                   <td className="p-3 border">
//                     <div className="flex items-center space-x-3">
//                       <button
//                         onClick={() => navigate(`/admin/order/${order._id}`)}
//                         className="text-indigo-600 hover:text-indigo-800 transition-colors"
//                         title="View Order"
//                       >
//                         <FaEye size={16} />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(order._id)}
//                         className="text-red-600 hover:text-red-800 transition-colors"
//                         disabled={isDeleting}
//                         title="Delete Order"
//                       >
//                         <FaTrash size={16} />
//                       </button>
//                     </div>
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

// export default AllOrdersHistoryPage;

// Import RTK Query hooks for fetching and deleting orders
import { useGetAllOrdersQuery, useDeleteOrderMutation } from "../../slices/productApiSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import ErrorMessage from "../../components/ErrorMessage";
import { toast } from "react-toastify";
import { FaTrash, FaEye } from "react-icons/fa";

const AllOrdersHistoryPage = () => {
  const navigate = useNavigate();

  // Fetch all orders
  const { data: orders = [], isLoading, error, refetch } = useGetAllOrdersQuery();

  // Mutation hook for deleting an order
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  // Handler to delete an order
  const handleDelete = async (orderId) => {
    if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
      try {
        await deleteOrder(orderId).unwrap(); // unwrap() throws error if failed
        toast.success('Order deleted successfully');
        refetch(); // Refresh order list after deletion
      } catch (err) {
        toast.error(err?.data?.message || err.message || 'Failed to delete order');
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">All Orders (Admin)</h1>

      {/* Show loader, error or the table */}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error?.data?.message || error.message} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                {/* Table headers */}
                <th className="p-3 border">ID</th>
                <th className="p-3 border">User</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Paid</th>
                <th className="p-3 border">Delivered</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* Render each order row */}
              {orders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-3 border">{order._id}</td>
                  <td className="p-3 border">{order.user?.name || 'Guest'}</td>
                  <td className="p-3 border">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3 border">
                    ₦{order.totalPrice?.toLocaleString() || '0'}
                  </td>
                  <td className="p-3 border">
                    {order.isPaid ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </td>
                  <td className="p-3 border">
                    {order.isDelivered ? (
                      <span className="text-green-600">Yes</span>
                    ) : (
                      <span className="text-red-600">No</span>
                    )}
                  </td>
                  <td className="p-3 border">
                    <div className="flex items-center space-x-3">
                      {/* View order details */}
                      <button
                        onClick={() => navigate(`/admin/order/${order._id}`)}
                        className="text-indigo-600 hover:text-indigo-800 transition-colors"
                        title="View Order"
                      >
                        <FaEye size={16} />
                      </button>

                      {/* Delete order */}
                      <button
                        onClick={() => handleDelete(order._id)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                        disabled={isDeleting}
                        title="Delete Order"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
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

export default AllOrdersHistoryPage;

