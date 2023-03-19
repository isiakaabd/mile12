import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  carts: [],
  cart: {},
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToCart: (state, action) => {
      state.carts.push(action.payload);
    },
    increaseCartItem: (state, action) => {
      const id = action.payload.id;
      const updatedCarts = state.carts.map((cart) => {
        if (cart.id === id) {
          const number = cart.number + 1;
          return {
            ...cart,
            totalPrice: cart.price * number,
            number,
          };
        }
        return cart;
      });

      return {
        ...state,
        carts: updatedCarts,
      };
    },
    removeItem: (state, action) => {},

    decreaseCartItem: (state, action) => {
      const id = action.payload.id;

      const index = state.carts.findIndex((cart) => cart.id === id);
      const updatedCarts = state.carts.map((cart) => {
        if (cart.id === id) {
          const number = cart.number - 1;
          if (number === 0) {
            // const arr = state.carts.splice(index, 1);
            console.log(index);
            // return {
            //   arr,
            // };
          } else {
            return {
              ...cart,
              totalPrice: cart.price * number,
              number,
            };
          }
        }
        return cart;
      });
      console.log(updatedCarts);
      return {
        ...state,
        carts: updatedCarts,
      };
    },
  },
});

export const { addToCart, increaseCartItem, decreaseCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
