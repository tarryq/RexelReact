import { createSlice } from '@reduxjs/toolkit';

const initialState = {
 items: [],
 totalItems: 0,
 cartSubtotal: 0.0,
};

const cartSlice = createSlice({
 name: 'cart',
 initialState,
 reducers: {
  updateCart: (state, action) => {
   state.items = action.payload;
   state.totalItems = state.items.reduce((total, item) => total + (item.quantitytoorder || 0), 0);
   state.cartSubtotal = state.items.reduce((total, item) => total + (item.quantitytoorder || 0) * (item.casePrice || 0), 0.0);
  },
 },
});

export const { updateCart } = cartSlice.actions;
export default cartSlice.reducer;