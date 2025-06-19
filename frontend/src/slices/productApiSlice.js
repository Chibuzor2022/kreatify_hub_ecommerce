// import { apiSlice } from "./apiSlice";
// export const productsApiSlice = apiSlice.injectEndpoints({
// 	endpoints: (builder) => ({
// 		// Fetch all products
// 		getProducts: builder.query({
// 			query: () => ({ url: "/products", method: "GET" }),
// 			providesTags: ["Product"],
// 		}),

// 		 // Search products
//     searchProducts: builder.query({
//       query: (keyword) => ({
//         url: "/products/search",
//         method: "GET",
//         params: { keyword },
//       }),
//       providesTags: (result, error, keyword) => [
//         { type: "Product", keyword },
//       ],
//       transformResponse: (response) => response, // Optional: transform the response if needed
//     }),

// 		// Fetch single product details
// 		getProductById: builder.query({
// 			query: (id) => ({ url: `/products/${id}`, method: "GET" }),
// 			providesTags: (result, error, id) => [{ type: "Product", id }],
// 		}),

// 		// Create a new product
// 		createProduct: builder.mutation({
// 			query: (newProduct) => ({
// 				url: "/products",
// 				method: "POST",
// 				body: newProduct,
// 				headers: {
// 					"Content-Type": "application/json",
// 				},
// 				credentials: "include",
// 			}),
// 			invalidatesTags: ["Product"],
// 		}),

//  updateProduct: builder.mutation({
//       query: ({ id, ...productData }) => ({
//         url: `/products/${id}`,
//         method: 'PUT',
//         data: productData, // this will hit axios's 'data'
//       }),
//       invalidatesTags: ['Products'],
//     }),



// 		// Delete a product
// 		deleteProduct: builder.mutation({
// 			query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
// 			invalidatesTags: ["Product"],
// 		}),
// 	}),
// });

// export const {
// 	useGetProductsQuery,
// 	useSearchProductsQuery,
// 	useGetProductByIdQuery,
// 	useCreateProductMutation,
// 	useUpdateProductMutation,
// 	useDeleteProductMutation,
// } = productsApiSlice;

import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all products
    // getProducts: builder.query({
    //   query: () => ({
    //     url: "/products",
    //     method: "GET",
    //   }),
    //   providesTags: ["Product"], // ✅ consistent tag
    // }),

getProducts: builder.query({
  query: ({ pageNumber = 1 }) => ({
    url: `/products`,
	method: "GET",
    params: { pageNumber },
  }),
  providesTags: ['Product'],
}),


    // Search products
    searchProducts: builder.query({
      query: (keyword) => ({
        url: "/products/search",
        method: "GET",
        params: { keyword },
      }),
      providesTags: (result, error, keyword) => [
        { type: "Product", keyword },
      ],
      transformResponse: (response) => response,
    }),

    // Fetch single product details
    getProductById: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "Product", id }],
    }),
// Get My Orders
	getMyOrders: builder.query({
  query: () => ({
    url: `/orders/myorders`,
    method: 'GET',
    credentials: 'include', // to send cookies (for auth)
  }),
}),

    // Create a new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: "/products",
        method: "POST",
        body: newProduct,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }),
      invalidatesTags: ["Product"], // ✅ refresh product list
    }),

    // Update product
    updateProduct: builder.mutation({
      query: ({ id, ...productData }) => ({
        url: `/products/${id}`,
        method: "PUT",
        data: productData, // ✅ use `data` with axios
      }),
      invalidatesTags: ["Product"], // ✅ fixed typo (was 'Products')
    }),

    // Delete product
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"], // ✅ auto-refresh product list
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSearchProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetMyOrdersQuery,
} = productsApiSlice;
