import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const OrderHistoryPage = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const {
    data: orders = [],
    isLoading,
    error,
    // refetch,
  } = useGetMyOrdersQuery(undefined, {
    refetchOnMountOrArgChange: true,
    pollingInterval: 30000,
  });

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Order History</h1>
       
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error?.data?.message || error?.message} />
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border text-sm">
            <thead className="bg-gray-100 uppercase text-left">
              <tr>
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Image</th>
                <th className="p-3 border">Name</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => {
                const firstItem = order.orderItems?.[0]; // Use first product in the order
                return (
                  <tr key={order._id} className="border-t hover:bg-gray-50">
                    <td className="p-3 border">{order._id}</td>

                    <td className="p-3 border">
                      {firstItem ? (
                        <img
                          src={firstItem.image}
                          alt={firstItem.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <span className="text-gray-400">No Image</span>
                      )}
                    </td>

                    <td className="p-3 border">
                      {firstItem?.name || "No Product"}
                      {order.orderItems.length > 1 && (
                        <span className="text-xs text-gray-500">
                          {" "}
                          + {order.orderItems.length - 1} more
                        </span>
                      )}
                    </td>

                    <td className="p-3 border">{order.createdAt.substring(0, 10)}</td>
                    <td className="p-3 border">₦{order.totalPrice.toLocaleString()}</td>
                    <td className="p-3 border">
                      <button
                        onClick={() => navigate(`/order/${order._id}`)}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;




