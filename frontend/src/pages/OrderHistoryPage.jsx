import { useEffect } from "react";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMyOrdersQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const OrderHistoryPage = () => {
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const {
    data: orders,
    isLoading,
    error,
  } = useGetMyOrdersQuery();

  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error?.data?.message || error?.message} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border">
            <thead>
              <tr className="bg-gray-100 text-left text-sm uppercase">
                <th className="p-3 border">ID</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Paid</th>
                <th className="p-3 border">Delivered</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id} className="text-sm border-t">
                  <td className="p-3 border">{order._id}</td>
                  <td className="p-3 border">
                    {order.createdAt.substring(0, 10)}
                  </td>
                  <td className="p-3 border">₦{order.totalPrice}</td>
                  <td className="p-3 border">
                    {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                  </td>
                  <td className="p-3 border">
                    {order.isDelivered
                      ? order.deliveredAt.substring(0, 10)
                      : "No"}
                  </td>
                  <td className="p-3 border">
                    <button
                      onClick={() => navigate(`/order/${order._id}`)}
                      className="text-indigo-600 hover:underline"
                    >
                      View
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

export default OrderHistoryPage;
