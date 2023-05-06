import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getUserDetails, logoutAction } from "redux/reducers/authReducer";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_BASE_URL,

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
  console.log(api);
  console.log(result, "result");
  console.log(extraOptions, "extraOptions");
  const newExtraOptions = {
    ...extraOptions,
    headers: {
      ...extraOptions?.headers,
      Authorization: `Bearer 123`,
    },
  };
  if (result?.error?.status === 403) {
    console.log(123, "result");
    // api.dispatch("refreshToken");
    const refreshResult = await baseQuery(
      "/auth/refresh-token",
      // {
      //   url:
      //   method: "POST",
      //   headers: "bearer 123",
      //   body: JSON.stringify("!22"),
      // },
      api,
      newExtraOptions
    );
    const token = refreshResult?.data?.accessToken;
    console.log(refreshResult);
    if (token) {
      api.dispatch(getUserDetails(token));
      result = await baseQuery(args, api, newExtraOptions);
    } else {
      await baseQuery("/logout", api, newExtraOptions);
      api.dispatch(logoutAction());
    }
  }

  return result;
};

const api = createApi({
  // reducerPath: "api",
  baseQuery: baseQuerywithAuth,
  tagTypes: ["admin", "product", "category", "order", "address"],
  endpoints: () => ({}),
});
export default api;
