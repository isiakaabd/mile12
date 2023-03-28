import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getProducts: (state, action) => {
      return {
        ...state,
        products: [...action.payload],
      };
    },
  },
});

export const { getProducts } = productSlice.actions;

export default productSlice.reducer;
