import apiSlice from ".";

export const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (body) => ({
        url: "/auth/signup",
        method: "POST",
        body,
      }),
      transformErrorResponse: (error) => error.data.message,
    }),
    login: builder.mutation({
      query: (body) => ({
        url: "/auth/login",
        method: "POST",
        body,
      }),

      transformErrorResponse: (error) => error.data.message,
    }),
    forgotPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/init-reset-password",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    recoverToken: builder.mutation({
      query: (body) => ({
        url: "/auth/validate-recover-token",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    resetPassword: builder.mutation({
      query: (body) => ({
        url: "/auth/reset-password",
        method: "POST",
        body,
      }),
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    refreshToken: builder.mutation({
      query: () => ({
        url: "/auth/refresh-token",
        method: "POST",
      }),
      // extraOptions: (_, { getState }) => {
      // get the new access token from the state
      // const newAccessToken = getState().auth.refreshToken;

      // pass the new token as an extra option ${newAccessToken}
      // return { headers: { Authorization: `Bearer 123` } };
      // },
      // transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
    changePassword: builder.mutation({
      query: (body) => ({
        url: `/user/change-password `,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["user", "post"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.message,
    }),

    logout: builder.mutation({
      query: () => ({
        url: "/user/logout",
        method: "POST",
      }),
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data.message,
    }),
  }),
});

export const {
  useChangePasswordMutation,
  useRegisterMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useResetPasswordMutation,
  useRecoverTokenMutation,
} = authSlice;
