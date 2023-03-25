import { api } from ".";

// ${category ? `?search=${category}` : ""}`,
export const productSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category }) => ({
        url: `/product${category ? `?category=${category} ` : ""}`,
      }),
      invalidatesTags: ["product"],
      transformResponse: (response) => response.body.products,
      transformErrorResponse: (error) => error.data,
    }),
    editProduct: builder.mutation({
      query: (body) => ({
        url: `/admin/product`,
        body,
        method: "PATCH",
      }),
      invalidatesTags: ["product"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.data,
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
      providesTags: ["product"],
      transformResponse: (response) => response.body.product,
      transformErrorResponse: (error) => error.data,
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/category`,
      }),
      providesTags: ["category"],
      transformResponse: (response) => response.body.categories,
      transformErrorResponse: (error) => error.data,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useLazyGetProductsQuery,
  useGetCategoriesQuery,
  useEditProductMutation,
} = productSlice;
