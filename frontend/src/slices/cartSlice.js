import { createSlice } from "@reduxjs/toolkit";

// Initialize cart items from localStorage with safe JSON parsing
let initialCartItems = [];
try {
	const storedCart = localStorage.getItem("cartItems");
	initialCartItems = storedCart ? JSON.parse(storedCart) : [];
} catch (error) {
	console.error("Invalid cartItems in localStorage", error);
	localStorage.removeItem("cartItems"); // Clear corrupted data
	initialCartItems = [];
}

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: initialCartItems,
	},
	reducers: {
		// Add or update item in cart
		addToCart: (state, action) => {
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x._id === item._id);
			const itemQty = Number(item.quantity);

			if (existItem) {
				// Update quantity if item already exists
				existItem.quantity = itemQty;
			} else {
				// Add new item to cart
				state.cartItems.push({
					...item,
					quantity: itemQty,
				});
			}

			// Persist updated cart to localStorage
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},

		// Remove item from cart
		removeFromCart: (state, action) => {
			const idToRemove = action.payload;
			state.cartItems = state.cartItems.filter(
				(item) => item._id !== idToRemove
			);
			// Update localStorage
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},

		// Clear all items from cart
		clearCart: (state) => {
			state.cartItems = [];
			localStorage.removeItem("cartItems");
		},
	},
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
