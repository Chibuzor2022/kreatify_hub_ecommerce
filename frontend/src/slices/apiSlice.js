import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
	reducerPath: "api",
	baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // adjust as needed
	tagTypes: ["User", "Users", "Product", "Order"],
	credentials: "include",

	endpoints: (builder) => ({}), // empty for now, extended later
});
