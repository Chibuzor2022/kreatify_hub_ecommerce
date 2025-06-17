
import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUsers: builder.query({
			// return an object, not a string
			query: () => ({
				url: "/users",
				method: "GET",
			}),
			providesTags: ["Users"],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `/users/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Users"],
		}),
		}),
});

export const { useGetUsersQuery, useDeleteUserMutation } = usersApiSlice;
