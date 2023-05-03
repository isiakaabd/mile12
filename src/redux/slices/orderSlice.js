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
    getOrder: builder.query({
      query: (id) => ({
        url: `/order/${id}`,
      }),
      providesTags: ["order"],
      transformResponse: (response) => response.body.order,
      transformErrorResponse: (error) => error.message,
    }),
    makeOrder: builder.mutation({
      query: (body) => ({
        url: `/order`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["order"],
      transformErrorResponse: (error) => error.data.message,
    }),
    verifyOrder: builder.mutation({
      query: (body) => ({
        url: `/order/verify`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["order"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.message,
    }),
    createContact: builder.mutation({
      query: (body) => ({
        url: `/contact`,
        body,
        method: "POST",
      }),
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.message,
    }),
  }),
});

export const {
  useGetOrdersQuery,
  useLazyGetOrdersQuery,
  useMakeOrderMutation,
  useCreateContactMutation,
  useGetOrderQuery,
  useVerifyOrderMutation,
} = productSlice;
