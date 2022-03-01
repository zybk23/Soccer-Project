import { createSlice } from "@reduxjs/toolkit";
import Data from "../../assets/data/data.json";

export const dataSlice = createSlice({
  name: "data",
  initialState: {
    bultenData: [],
    loading: false,
    currentPage: 1,
    data: [],
  },
  reducers: {
    setBultenData: (state, action) => {
      const keys = Object.keys(Data.Events);
      const values = Object.values(Data.Events);
      const modifiedData = [];
      for (let i = 0; i < keys.length; i++) {
        modifiedData.push({
          id: i + 1,
          key: keys[i],
          value: values[i],
        });
      }
      state.bultenData = modifiedData;
      state.isDataLoding = false;
    },
    setData: (state, action) => {
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
        currentPage: state.currentPage + 1,
      };
    },
  },
  extraReducers: {},
});

export const { setData, setBultenData } = dataSlice.actions;

export default dataSlice.reducer;
