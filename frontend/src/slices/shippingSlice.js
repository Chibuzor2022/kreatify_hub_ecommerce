import { createSlice } from '@reduxjs/toolkit';

// Optional: load from localStorage if you want persistence
// const savedShippingAddress = localStorage.getItem('shippingAddress')
//   ? JSON.parse(localStorage.getItem('shippingAddress'))
//   : {
//       address: '',
//       city: '',
//       postalCode: '',
//       country: '',
//       phone: '',
//     };

const initialState = {
  shippingAddress: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  },
  // shippingAddress: savedShippingAddress, // Uncomment this if using localStorage
};

const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      // Optional: save to localStorage for persistence
      // localStorage.setItem('shippingAddress', JSON.stringify(action.payload));
    },
  },
});

export const { saveShippingAddress } = shippingSlice.actions;
export default shippingSlice.reducer;
