import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserDetails, logoutAction } from "redux/reducers/authReducer";

const baseQuery = fetchBaseQuery({
  baseUrl:
    process.env.NODE_ENV !== "production"
      ? process.env.REACT_APP_BASE_URL
      : process.env.REACT_APP_BASE_URL_PRODUCTION,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const token = getState().auth.token;

    if (endpoint !== "createPoduct") {
      headers.set("Content-Type", "application/json");
    }
    if (endpoint === "editProduct") {
      headers.delete("Content-Type", "application/json");
    }
    if (token) {
      headers.set("AUTHORIZATION", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQuerywithAuth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const refreshToken = localStorage.getItem("refresh_token");

  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        headers: (header) => {
          header.set("authorization", `bearer ${refreshToken}`);
        },
      },
      api,
      extraOptions
    );
    const token = refreshResult?.data?.accessToken;
    if (token) {
      api.dispatch(getUserDetails(token));
      result = await baseQuery(args, api, extraOptions);
    } else {
      await baseQuery("/logout", api, extraOptions);
      api.dispatch(logoutAction());
    }
  }

  return result;
};

export const api = createApi({
  // reducerPath: "api",
  baseQuery: baseQuerywithAuth,
  tagTypes: ["admin", "product", "category", "order", "address"],
  endpoints: () => ({}),
});
