
import { createSlice } from "@reduxjs/toolkit";

// ✅ Safely parse localStorage with a fallback to []
let initialCartItems = [];
try {
	const storedCart = localStorage.getItem("cartItems");
	initialCartItems = storedCart ? JSON.parse(storedCart) : [];
} catch (error) {
	console.error("Invalid cartItems in localStorage", error);
	localStorage.removeItem("cartItems"); // remove invalid data
	initialCartItems = [];
}

const cartSlice = createSlice({
	name: "cart",
	initialState: {
		cartItems: initialCartItems,
	},
	reducers: {
		addToCart: (state, action) => {
			const item = action.payload;
			const existItem = state.cartItems.find((x) => x._id === item._id);
			const itemQty = Number(item.quantity);

			if (existItem) {
				existItem.quantity = itemQty;
			} else {
				state.cartItems.push({
					...item,
					quantity: itemQty,
				});
			}

			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},

		removeFromCart: (state, action) => {
			const idToRemove = action.payload;
			state.cartItems = state.cartItems.filter(
				(item) => item._id !== idToRemove
			);
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems)); // ✅ keep in sync
		},

		clearCart: (state) => {
			state.cartItems = [];
			localStorage.removeItem("cartItems");
		},
	},
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
