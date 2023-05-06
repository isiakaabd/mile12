import apiSlice from ".";

export const adminSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPoduct: builder.mutation({
      query: (body) => ({
        url: `/admin/product`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["admin"],
      transformResponse: (response) => response,
      transformErrorResponse: (error) => error.data,
    }),
    getStats: builder.query({
      query: () => ({
        url: `/admin/order/stats`,
      }),
      invalidatesTags: ["admin"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.message,
    }),
    getContacts: builder.query({
      query: ({ offset }) => ({
        url: `/contact?limit=10&offset=${offset ? offset : 0}`,
      }),
      invalidatesTags: ["admin"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.message,
    }),
    updateOrder: builder.mutation({
      query: (body) => ({
        url: `/admin/order/update-status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["admin"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.message,
    }),
  }),
});

export const {
  useCreatePoductMutation,
  useUpdateOrderMutation,
  useGetStatsQuery,
  useGetContactsQuery,
} = adminSlice;
