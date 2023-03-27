import { api } from ".";

// ${category ? `?search=${category}` : ""}`,
export const productSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, date_direction }) => ({
        url: `/product/?${category ? `&category=${category}` : ""}${
          date_direction ? `&date_direction=${date_direction}` : ""
        }`,
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
      transformErrorResponse: (error) => error.message,
    }),
    rateProduct: builder.mutation({
      query: (body) => ({
        url: `/product/rate`,
        body,
        method: "POST",
      }),
      invalidatesTags: ["product"],
      transformResponse: (response) => response.message,
      transformErrorResponse: (error) => error.message,
    }),
    getProduct: builder.query({
      query: (id) => ({
        url: `/product/${id}`,
      }),
      providesTags: ["product"],
      transformResponse: (response) => response.body.product,
      transformErrorResponse: (error) => error.message,
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/category`,
      }),
      providesTags: ["category"],
      transformResponse: (response) => response.body.categories,
      transformErrorResponse: (error) => error.message,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useLazyGetProductsQuery,
  useRateProductMutation,
  useGetCategoriesQuery,
  useEditProductMutation,
} = productSlice;
