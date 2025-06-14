import { apiSlice } from "./apiSlice";
export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		// Fetch all products
		getProducts: builder.query({
			query: () => ({ url: "/products", method: "GET" }),
			providesTags: ["Product"],
		}),

		// Fetch single product details
		getProductById: builder.query({
			query: (id) => ({ url: `/products/${id}`, method: "GET" }),
			providesTags: (result, error, id) => [{ type: "Product", id }],
		}),

		// Create a new product
		// createProduct: builder.mutation({
		// 	query: () => ({ url: "/products", method: "POST" }),
		// 	invalidatesTags: ["Product"],
		// }),
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
			invalidatesTags: ["Product"],
		}),

		// Update an existing product
		// updateProduct: builder.mutation({
		// 	query: ({ id, ...data }) => ({
		// 		url: `/products/${id}`,
		// 		method: "PUT",
		// 		data,
		// 		headers: {
		// 			"Content-Type": "application/json",
		// 		},
		// 		credentials: "include", // If using cookies for auth
		// 	}),
		// }),
		updateProduct: builder.mutation({
  query: ({ id, ...data }) => ({
    url: `/products/${id}`,
    method: 'PUT',
    data,
  }),
  invalidatesTags: (result, error, { id }) => [
    { type: 'Product', id },
    { type: 'Product' }, // Also invalidate the list
  ],
}),


		// Delete a product
		deleteProduct: builder.mutation({
			query: (id) => ({ url: `/products/${id}`, method: "DELETE" }),
			invalidatesTags: ["Product"],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductByIdQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productsApiSlice;
