import { api } from ".";

export const adminSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (body) => ({
        url: `/address`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["address"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data,
    }),
    getAddress: builder.query({
      query: () => ({
        url: `/address/`,
      }),
      providesTags: ["address"],
      transformResponse: (response) => response.body.addresses,
      transformErrorResponse: (error) => error.data,
    }),
  }),
});

export const { useCreateAddressMutation, useGetAddressQuery } = adminSlice;
