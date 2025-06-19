import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

// Register user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ name, email, phone, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/register`,
        { name, email, phone, password },
        { withCredentials: true }
      );
      toast.success('Registration successful');
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Login user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/users/login`,
        { email, password },
        { withCredentials: true }
      );
      toast.success('Login successful');
      return data;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
      return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// Update user profile
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
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
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

// Custom logout thunk
export const logoutUser = () => async (dispatch) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/logout`, {}, { withCredentials: true });
  } catch (error) {
    console.error('Logout error:', error);
  }
  dispatch(logout());
};

export const { logout } = authSlice.actions;
export default authSlice.reducer;








// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// export const registerUser = createAsyncThunk(
//   'auth/registerUser',
//   async ({ name, email, phone,  password }, thunkAPI) => {
//     try {
//     //   const { data } = await axios.post('/users/register', { name, email, password });
//       const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/users/register`, { name, email, phone, password });
// 	   toast.success('Registration successful');
//       return data;
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const loginUser = createAsyncThunk(
//   'auth/loginUser',
//   async ({ email, password }, thunkAPI) => {
//     try {
//     //   const { data } = await axios.post('/users/login', { email, password });
//       const { data } = await axios.post(
//       `${import.meta.env.VITE_API_URL}/users/login`, { email, password });
//       toast.success('Login successful');
//       return data;
//     } catch (error) {
//       toast.error(error.response?.data?.message || 'Login failed');
//       return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// export const updateUserProfile = createAsyncThunk(
//   'auth/updateUserProfile',
//   async (userData, { getState, rejectWithValue }) => {
//     try {
//       const {
//         auth: { user },
//       } = getState();

//       const config = {
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/users/profile`, userData, config);
//       localStorage.setItem('user', JSON.stringify(data));
//       return data;
// 	    } catch (error) {
//       return rejectWithValue(error.response?.data?.message || error.message);
//     }
//   }
// );

// const authSlice = createSlice({
//   name: 'auth',
//   initialState: {
//     user: JSON.parse(localStorage.getItem('user')) || null,
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     logout: (state) => {
//       state.user = null;
//       localStorage.removeItem('user');
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(registerUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(registerUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(registerUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(loginUser.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(loginUser.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(loginUser.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       })
//       .addCase(updateUserProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(updateUserProfile.fulfilled, (state, action) => {
//         state.loading = false;
//         state.user = action.payload;
//       })
//       .addCase(updateUserProfile.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload;
//       });
//   },
// });

// export const logoutUser = () => async (dispatch) => {
//   try {
//     await axios.post('/users/logout');
//   } catch (error) {
//     console.error('Logout error:', error);
//   }
//   dispatch(logout());
// };

// export const { logout } = authSlice.actions;
// export default authSlice.reducer;
