
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({

    // ✅ Fetch all products with optional pagination
    getProducts: builder.query({
      query: (arg = {}) => {
        const { pageNumber = 1 } = arg;
        return {
          url: `/products`,
          method: "GET",
          params: { pageNumber },
        };
      },
      providesTags: ['Product'],
    }),

    // ✅ Search products by keyword
    searchProducts: builder.query({
      query: (keyword) => ({
        url: "/products/search",
        method: "GET",
        params: { keyword },
      }),
      providesTags: (result, error, keyword) => [
        { type: "Product", keyword },
      ],
    }),

    // ✅ Fetch single product details
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),

    // ✅ Get current user's orders
    getMyOrders: builder.query({
      query: () => ({
        url: `/orders/myorders`,
        method: 'GET',
        credentials: 'include', // ✅ Ensures cookie is sent
      }),
      providesTags: ['MyOrders'],
    }),

    // ✅ Get order by ID (for viewing on order details page)
    getOrderById: builder.query({
      query: (id) => ({
        url: `/orders/${id}`,
        method: "GET",
        credentials: 'include',
      }),
      providesTags: (result, error, id) => [{ type: "Order", id }],
    }),

    // Create a new order
    createOrder: builder.mutation({
      query: (orderData) => ({
        url: "/orders",
        method: "POST",
        body: orderData,
        credentials: 'include', //  required for cookie auth
      }),
      invalidatesTags: ['MyOrders'],
    }),

    // Mark order as paid (Paystack payment callback)
    payOrder: builder.mutation({
      query: ({ orderId, paymentResult }) => ({
        url: `/orders/${orderId}/payment`,
        method: "PUT",
        body: paymentResult,
        credentials: 'include',
      }),
      invalidatesTags: (result, error, { orderId }) => [
        { type: "Order", id: orderId },
        'MyOrders',
      ],
    }),

    // Create a new product (Admin only)
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),

    // ✅ Update a product
   updateProduct: builder.mutation({
  query: ({ id, ...productData }) => ({
    url: `/products/${id}`,
    method: "PUT",
   data: productData, 
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }),
  invalidatesTags: ["Product"],
}),

    // Get All Orders (Admin only)
    getAllOrders: builder.query({
  query: () => ({
    url: `/orders`,
    method: "GET",
    credentials: "include",
  }),
  providesTags: ['Orders'],
}),
    // ✅ Delete a product (Admin only)
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Product"],
    }),
    //  Delete an order (Admin only)
   
      deleteOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
  useGetMyOrdersQuery,
  useGetOrderByIdQuery,
  useCreateOrderMutation,
  usePayOrderMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetAllOrdersQuery,
  useDeleteOrderMutation
} = productsApiSlice;



