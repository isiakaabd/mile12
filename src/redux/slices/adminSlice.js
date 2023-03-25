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
  }),
});

export const { useCreatePoductMutation } = adminSlice;
