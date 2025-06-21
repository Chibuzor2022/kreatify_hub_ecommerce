
import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../utils/axiosBaseQuery';

export const apiSlice = createApi({
  // Use custom axios base query for handling requests (with support for credentials, headers, etc.)
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),

  // Define tag types used for cache invalidation and re-fetching
  tagTypes: ['Users', 'Products', 'Orders'],

  // Endpoints will be injected in other slices using apiSlice.injectEndpoints()
  endpoints: () => ({}),
});
