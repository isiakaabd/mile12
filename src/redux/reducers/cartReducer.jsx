import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  carts: JSON.parse(localStorage.getItem("carts")) || [],
  cart: {},
  totalPayout: Number(localStorage.getItem("totalPayout") || 0),
};

export const cartSlice = createSlice({
  name: "carts",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    addToCart: (state, action) => {
      const obj = { ...action.payload };
      const check = current(state.carts).findIndex(
        (item) => item.id === obj.id
      );

      if (check >= 0) return;
      else {
        obj.number = 1;
        obj.addedToCart = true;
        obj.totalPrice = obj.price;
        const x = [obj, ...state.carts];
        const price = x.reduce((a, x) => a + x.price, 0);
        localStorage.setItem("carts", JSON.stringify(x));
        localStorage.setItem("totalPayout", price);
        return {
          ...state,
          carts: x,
          totalPayout: price,
        };
      }
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
      let price = updatedCarts.reduce((a, x) => a + x.totalPrice, 0);

      localStorage.setItem("carts", JSON.stringify(updatedCarts));
      localStorage.setItem("totalPayout", price);
      return {
        ...state,
        carts: updatedCarts,
        totalPayout: price,
      };
    },
    removeCartItem: (state, action) => {
      const id = action.payload.id;
      const arr = current(state.carts);
      const newCart = arr.filter((item) => item.id !== id);
      let price = newCart.reduce((a, x) => a + x.totalPrice, 0);
      localStorage.setItem("carts", JSON.stringify(newCart));
      localStorage.setItem("totalPayout", price);
      return {
        ...state,
        carts: newCart,
        totalPayout: price,
      };
    },

    decreaseCartItem: (state, action) => {
      const id = action.payload.id;

      const updatedCarts = state.carts.map((cart, index) => {
        if (cart.id === id) {
          let number = cart.number - 1;
          if (number === 0) number = 1;
          else {
            return {
              ...cart,
              totalPrice: cart.price * number,
              number,
            };
          }
        }
        return cart;
      });
      let price = updatedCarts.reduce((a, x) => a + x.totalPrice, 0);

      localStorage.setItem("carts", JSON.stringify(updatedCarts));
      localStorage.setItem("totalPayout", price);
      return {
        ...state,
        carts: updatedCarts,
        totalPayout: price,
      };
    },
  },
});

export const { addToCart, increaseCartItem, decreaseCartItem, removeCartItem } =
  cartSlice.actions;

export default cartSlice.reducer;
