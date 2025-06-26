import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { clearCart } from '../slices/cartSlice';
import { apiSlice } from './apiSlice'

// Async thunk for registering a new user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, phone, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        { name, email, phone, password },
        { withCredentials: true } // send cookies for session auth
      );
      toast.success('Registration successful');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for logging in a user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { email, password },
        { withCredentials: true } // include cookies for authentication
      );
      toast.success('Login successful');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Async thunk for updating user profile
export const updateUserProfile = createAsyncThunk(
  'auth/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        `${import.meta.env.VITE_API_URL}/users/profile`,
        userData,
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    // Reducer to handle logout
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Register user
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Login user
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Logout thunk to remove session from backend and update frontend state
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error('Logout error:', error);
  }
  dispatch(logout());
  dispatch(clearCart());          // clears cart
  dispatch(apiSlice.util.resetApiState()); // clears RTK Query cache
};

export const { logout } = authSlice.actions;
export default authSlice.reducer;
