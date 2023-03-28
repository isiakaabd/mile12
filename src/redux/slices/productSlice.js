import { api } from ".";

// ${category ? `?search=${category}` : ""}`,
export const productSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ category, search, date_direction }) => ({
        url: `/product/?${category ? `&category=${category}` : ""}${
          search ? `&search=${search}` : ""
        }${date_direction ? `&date_direction=${date_direction}` : ""}`,
      }),
      // serializeQueryArgs: ({ endpointName }) => {
      //   return endpointName;
      // },
      // // Always merge incoming data to the cache entry
      // merge: (currentCache, newItems, arg) => {
      //   console.log(newItems, arg);
      //   return newItems[0].parentId === arg.parentId
      //     ? currentCache?.comments?.push(...newItems?.comments)
      //     : null;
      // },
      // Refetch when the page arg changes
      // forceRefetch({ currentArg, previousArg }) {
      //   return currentArg !== previousArg;
      // },
      // providesTags: (result, error, arg) =>

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
