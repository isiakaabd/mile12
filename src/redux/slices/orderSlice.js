import { api } from ".";

export const productSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getOrders: builder.query({
      query: ({ offset, status }) => ({
        url: `/order?limit=10${`&offset=${offset ? offset : 0}`}${`${
          status ? `&status=${status}` : ""
        }`}`,
      }),
      providesTags: ["order"],
      transformResponse: (response) => response.body,
      transformErrorResponse: (error) => error.data,
    }),
    makeOrder: builder.mutation({
      query: (body) => ({
        url: `/order/`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["order"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data,
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
  useMakeOrderMutation,
} = productSlice;
