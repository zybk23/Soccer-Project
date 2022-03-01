import { combineReducers } from "@reduxjs/toolkit";
import dataSlice from "./dataStore";
import cartSlice from "./cartStore";

const createReducer = combineReducers({
  dataSlice,
  cartSlice,
});

export default createReducer;
