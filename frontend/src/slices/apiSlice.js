import { createApi } from "@reduxjs/toolkit/query/react";
// import axiosBaseQuery from "../utils/axiosBaseQuery";

// export const apiSlice = createApi({
// 	reducerPath: "api",
// 	baseQuery: axiosBaseQuery({ baseUrl: "" }),
// 	tagTypes: ["User", "Users", "Product", "Order"],
// 	endpoints: (builder) => ({}), // endpoints injected later
// });


import axiosBaseQuery from '../utils/axiosBaseQuery';

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: '', // Empty because axiosInstance already has baseURL
  }),
  tagTypes: ['Product', 'User', 'Order'],
  endpoints: () => ({}),
});