import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "data",
  initialState: {
    cartData: [],
  },
  reducers: {
    setCartData: (state, action) => {
      let modifiedCartData = [...state.cartData];
      const findCurrentItem = modifiedCartData.find(
        (x) => x.id === action.payload.id
      );
      if (findCurrentItem) {
        if (findCurrentItem.rate == action.payload.rate) {
          modifiedCartData = modifiedCartData.filter(
            (x) => x.id !== action.payload.id
          );
        } else {
          const findIndex = modifiedCartData.findIndex(
            (k) => k.id === action.payload.id
          );
          modifiedCartData[findIndex].rate = action.payload.rate;
        }
      } else {
        modifiedCartData.push(action.payload);
      }
      state.cartData = modifiedCartData;
    },
  },
  extraReducers: {},
});

export const { setCartData } = cartSlice.actions;

export default cartSlice.reducer;
