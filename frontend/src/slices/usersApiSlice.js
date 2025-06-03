import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			query: () => "/users",
			providesTags: ["Users"],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
		// Optionally add updateUser here if not using separate edit page
	}),
});

export const { useGetUsersQuery, useDeleteUserMutation } = usersApiSlice;
