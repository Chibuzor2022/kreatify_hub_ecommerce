import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import shippingReducer from "./slices/shippingSlice";
import { apiSlice } from "./slices/apiSlice";

export const store = configureStore({
  reducer: {
    // Add RTK Query reducer for API caching and state
    [apiSlice.reducerPath]: apiSlice.reducer,

    // Add custom reducers for authentication, cart, and shipping
    auth: authReducer,
    cart: cartReducer,
    shipping: shippingReducer,
  },

  // Extend middleware to include RTK Query's middleware for caching, invalidation, polling, etc.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

