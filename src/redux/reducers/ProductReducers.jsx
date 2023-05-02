import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  offset: 0,
  total_pages: 1,
};

export const productSlice = createSlice({
  name: "products",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    getProducts: (state, action) => {
      return {
        ...state,
        products: [...action.payload.products],
        offset: action.payload.offset,
        total_pages: action.payload.total_pages,
      };
    },
  },
});

export const { getProducts } = productSlice.actions;

export default productSlice.reducer;
