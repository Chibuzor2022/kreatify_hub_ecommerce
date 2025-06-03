import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios"; // make sure this is your axios instance
import { toast } from "react-toastify";

// Register user thunk
export const registerUser = createAsyncThunk(
	"auth/registerUser",
	async ({ name, email, password }, thunkAPI) => {
		try {
			const response = await axiosInstance.post("/users/register", {
				name,
				email,
				password,
			});
			return response.data;
		} catch (error) {
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || error.message
			);
		}
	}
);

// Login user thunk
export const loginUser = createAsyncThunk(
	"auth/loginUser",
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await axiosInstance.post("/users/login", {
				email,
				password,
			});
			toast.success("Login successful");
			return response.data;
		} catch (error) {
			toast.error(error.response?.data?.message || "Login failed");
			return thunkAPI.rejectWithValue(
				error.response?.data?.message || error.message
			);
		}
	}
);

// Update user profile thunk
export const updateUserProfile = createAsyncThunk(
	"auth/updateUserProfile",
	async (userData, { getState, rejectWithValue }) => {
		try {
			const {
				auth: { user },
			} = getState();

			const config = {
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axiosInstance.put(
				"/users/profile",
				userData,
				config
			);

			// Update localStorage with new user data
			localStorage.setItem("user", JSON.stringify(data));
			return data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	}
);

const authSlice = createSlice({
	name: "auth",
	initialState: {
		user: JSON.parse(localStorage.getItem("user")) || null, // initialize from localStorage
		loading: false,
		error: null,
	},
	reducers: {
		logout: (state) => {
			state.user = null;
			localStorage.removeItem("user");
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
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			})

			// Login user
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				localStorage.setItem("user", JSON.stringify(action.payload));
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			})

			// Update user profile
			.addCase(updateUserProfile.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(updateUserProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.user = action.payload;
				state.error = null;
			})
			.addCase(updateUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || action.error.message;
			});
	},
});

export const getAllUsers = createAsyncThunk(
	"admin/getAllUsers",
	async (_, { getState, rejectWithValue }) => {
		try {
			const {
				auth: { user },
			} = getState();

			const config = {
				headers: {
					Authorization: `Bearer ${user.token}`,
				},
			};

			const { data } = await axiosInstance.get("/users", config);
			return data;
		} catch (error) {
			return rejectWithValue(error.response?.data?.message || error.message);
		}
	}
);

export const { logout } = authSlice.actions;

// Thunk for logout API call and client state cleanup
export const logoutUser = () => async (dispatch) => {
	try {
		await axiosInstance.post("/users/logout");
	} catch (error) {
		console.error("Logout error:", error);
	}
	dispatch(logout());
	localStorage.removeItem("user");
};

export default authSlice.reducer;
