import { api } from ".";

export const adminSlice = api.injectEndpoints({
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
      transformErrorResponse: (error) => error.data,
    }),
    updateOrder: builder.mutation({
      query: (body) => ({
        url: `/admin/order/update-status`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["admin"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.data,
    }),
  }),
});

export const {
  useCreatePoductMutation,
  useUpdateOrderMutation,
  useGetStatsQuery,
} = adminSlice;
