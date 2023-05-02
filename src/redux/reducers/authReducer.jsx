import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loading: false,
  auth: localStorage.getItem("access_token") ? true : false,
  admin: localStorage.getItem("admin") || null,
  token: localStorage.getItem("access_token") || null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    loginAction: (state, action) => {
      state.auth = true;
      localStorage.setItem("access_token", action.payload.token.accessToken);
      localStorage.setItem("refresh_token", action.payload.token.refreshToken);
      state.user = action.payload;
      state.token = action.payload.token.accessToken;
    },

    checkAdmin: (state, action) => {
      localStorage.setItem("admin", action.payload);
      state.admin = action.payload;
    },
    loginActionSocial: (state, action) => {
      state.auth = true;
      localStorage.setItem("access_token", action.payload.accessToken);
      localStorage.setItem("refresh_token", action.payload.refreshToken);

      state.user = action.payload;
      state.token = action.payload.accessToken;
    },
    logoutAction: (state, action) => {
      localStorage.clear();
      state.token = null;
      state.user = {};
      state.auth = false;
      state.admin = null;
    },
  },
});

const { reducer, actions } = authSlice;
export const {
  registerAction,
  loginAction,
  logoutAction,
  checkAdmin,
  getToken,
  getUserDetails,
  loginActionSocial,
} = actions;
export const loginState = (state) => state.auth;
export const registerState = (state) => state.register;
export const userProfile = (state) => state.user;

export default reducer;
