import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  shippingAddress: {
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
  },
 
};

const shippingSlice = createSlice({
  name: 'shipping',
  initialState,
  reducers: {
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

         },
  },
});

export const { saveShippingAddress } = shippingSlice.actions;
export default shippingSlice.reducer;
