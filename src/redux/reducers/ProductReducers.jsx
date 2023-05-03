import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  products: [],
  offset: 0,
  status: false,
  total_pages: 1,
  error: null,
};
const baseUrl = process.env.REACT_APP_BASE_URL;

export const getProducts = createAsyncThunk(
  "products/fetchProduct",
  async ({ category, date_from, offset, search, date_direction }) => {
    try {
      const response = await axios.get(
        `${baseUrl}/product/?${`offset=${offset ? offset : 0}&`}${
          category ? `category=${category}&` : ""
        }${date_from ? `date_from=${date_from}` : ""}${
          search ? `&search=${search}` : ""
        }${date_direction ? `&date_direction=${date_direction}` : ""}`
      );
      return response.data.body;
    } catch (error) {
      return error.message;
    }
  }
);
export const productSlice = createSlice({
  name: "products",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = false;
        state.products = [...action.payload.products];
        state.offset = action.payload.offset;
        state.total_pages = action.payload.total_pages;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = false;
        state.error = action.console.error.message;
      });
  },
});
export const getAllProducts = (state) => state.products;
// export const { getProducts } = productSlice.actions;

export default productSlice.reducer;
