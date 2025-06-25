import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetOrderByIdQuery } from "../slices/productApiSlice";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

const OrderDetailsPage = () => {
  const { id: orderId } = useParams();

  // Fetch order by ID using RTK Query
  const {
    data: order,
    isLoading,
    error,
    refetch,
  } = useGetOrderByIdQuery(orderId, {
    refetchOnMountOrArgChange: true,
  });

  //  Optional: auto-refetch on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6">Order #{orderId}</h1>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMessage message={error?.data?.message || error.message} />
      ) : (
        <>
          {/* Shipping Info */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Shipping</h2>
            <p><strong>Name:</strong> {order.user?.name}</p>
            <p><strong>Email:</strong> {order.user?.email}</p>
            <p><strong>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}, {order.shippingAddress?.postalCode}, {order.shippingAddress?.country}</p>
           
          </div>

          {/* Payment Info */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Payment</h2>
            <p><strong>Method:</strong> {order.paymentMethod}</p>
           
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
            {order.orderItems.length === 0 ? (
              <p>No items in this order.</p>
            ) : (
              <div className="border rounded">
                {order.orderItems.map((item) => (
                   <div key={item._id} className="flex justify-between items-center border-b p-3">
                    <div className="flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <span>{item.name}</span>
                    </div>
                    <span>{item.quantity} × ₦{item.price} = ₦{(item.quantity * item.price).toLocaleString()}</span>
                  </div>
                  
                ))}
              </div>
            )}
          </div>
          {/* Order Summary */}
          <div className="border p-4 rounded shadow-md">            
         <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              {/* <span>₦{order.shippingPrice.toLocaleString()}</span> */}
              <span>₦{order.shippingPrice}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Tax:</span>
              {/* <span>₦{order.taxPrice.toLocaleString()}</span> */}
              <span>₦{order.taxPrice}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 mt-2">
              <span>Total:</span>
              <span>₦{order.totalPrice}</span>
              {/* <span>₦{order.totalPrice.toLocaleString()}</span> */}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetailsPage;
