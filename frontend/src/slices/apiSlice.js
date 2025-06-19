// import { createApi } from '@reduxjs/toolkit/query/react';
// import axiosBaseQuery from '../utils/axiosBaseQuery';

// export const apiSlice = createApi({
//   // baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL + '/api' }),
//   baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL  }),
//   tagTypes: ['Users', 'Products', 'Orders'], // Add more as needed
//   endpoints: () => ({}), // empty; will be injected
// });


import { createApi } from '@reduxjs/toolkit/query/react';
import axiosBaseQuery from '../utils/axiosBaseQuery';

export const apiSlice = createApi({
  baseQuery: axiosBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  tagTypes: ['Users', 'Products', 'Orders'],
  endpoints: () => ({}),
});
