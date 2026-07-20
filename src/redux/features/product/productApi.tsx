/* eslint-disable @typescript-eslint/no-explicit-any */

import {  PRODUCT_ENDPOINTS, CACHE_TAGS } from "@/lib/constants";
import baseApi from "@/redux/api/baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /**
     * 🔹 POST /api/v1/Product/create
     * Create new Product (Admin only)
     */
    createProduct: builder.mutation<any, any>({
      query: (formData) => ({
        url: PRODUCT_ENDPOINTS.CREATE,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [CACHE_TAGS.PRODUCT],
    }),

    /**
     * 🔹 GET /api/v1/Product/find
     * Get all Products (Authenticated)
     */
//     getAllProducts: builder.query<
//   any,
// any
// >({
//   query: ({
//     page = 1,
//     limit = 1000,
//     search = "",
//     status,
//     isTrash,
//   }) => ({
//     url: PRODUCT_ENDPOINTS.FIND_ALL,
//     method: "GET",
//     params: {
//       page,
//       limit,
//       search,
//       status,
//       isTrash,
//     },
//   }),
//   providesTags: [CACHE_TAGS.PRODUCT],
// }),

getAllProducts: builder.query<any, any>({
  query: ({
    search,
    page = 1,
    limit = 10,
    status,
    isTrash = false,

    minPrice,
    maxPrice,
    verification,
    recommendation,

    condition,
    bedrooms,
    bathrooms,
    balcony,
    drawingSpace,
    diningRoom,
    kitchen,
    parking,

    gas,
    facing,
    electricity,
    water,

    collegeUniversity,
    hospitalClinic,
    mosque,
    supermarketGrocery,
    bankATM,
    busMetroStation,

    propertyType,
    categoryId,
    areaId,
    createBy,
    getFor
  }) => ({
    url: PRODUCT_ENDPOINTS.FIND_ALL,
    method: "GET",
    params: {
      search,
    page ,
    limit ,
    status,
    isTrash,

    minPrice,
    maxPrice,
    verification,
    recommendation,

    condition,
    bedrooms,
    bathrooms,
    balcony,
    drawingSpace,
    diningRoom,
    kitchen,
    parking,

    gas,
    facing,
    electricity,
    water,

    collegeUniversity,
    hospitalClinic,
    mosque,
    supermarketGrocery,
    bankATM,
    busMetroStation,

    propertyType,
    categoryId,
    areaId,
    createBy,
    getFor
    },
  }),
  providesTags: [CACHE_TAGS.PRODUCT],
}),



    /**
     * 🔹 GET /api/v1/Product/find-single/:slug
     * Get single Product by slug
     */
    getSingleProductBySlug: builder.query<any, string>({
      query: (slug) => ({
        url: PRODUCT_ENDPOINTS.FIND_SINGLE(slug),
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.PRODUCT],
    }),

    /**
     * 🔹 PUT /api/v1/Product/update/:id
     * Update Product details (Admin only)
     */
    updateProduct: builder.mutation<any, { id: string; payload: any }>({
      query: ({ id, payload }) => ({
        url: PRODUCT_ENDPOINTS.UPDATE(id),
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [CACHE_TAGS.PRODUCT],
    }),

    /**
     * 🔹 PUT /api/v1/Product/status/:id
     * Update Product active status (Admin only)
     */
    updateProductStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: PRODUCT_ENDPOINTS.STATUS(id),
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [CACHE_TAGS.PRODUCT],
    }),

    /**
     * 🔹 PUT /api/v1/Product/trash/:id
     * Move Product to trash / restore (Admin only)
     */
    updateProductTrashStatus: builder.mutation<any, { id: string; isTrash: boolean }>({
      query: ({ id, isTrash }) => ({
        url: PRODUCT_ENDPOINTS.TRASH(id),
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: [CACHE_TAGS.PRODUCT],
    }),

    
        updateProductVerificationStatus: builder.mutation<any, { id: string; verification: boolean }>({
          query: ({ id, verification }) => ({
            url: PRODUCT_ENDPOINTS.VERIFICATION(id),
            method: "PUT",
            body: { verification },
          }),
          invalidatesTags: [CACHE_TAGS.PRODUCT],
        }),
        updateProductRecommendationStatus: builder.mutation<any, { id: string; recommendation: boolean }>({
          query: ({ id, recommendation }) => ({
            url: PRODUCT_ENDPOINTS.RECOMMENDATION(id),
            method: "PUT",
            body: { recommendation },
          }),
          invalidatesTags: [CACHE_TAGS.PRODUCT],
        }),
    /**
     * 🔹 DELETE /api/v1/Product/delete/:id
     * Permanently delete Product (Admin only)
     */
    deleteProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: PRODUCT_ENDPOINTS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [CACHE_TAGS.PRODUCT],
    }),

  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductsQuery,
  useGetSingleProductBySlugQuery,
  useUpdateProductMutation,
  useUpdateProductStatusMutation,
  useUpdateProductTrashStatusMutation,
  useUpdateProductVerificationStatusMutation,
  useUpdateProductRecommendationStatusMutation,
  useDeleteProductMutation,
} = api;

export default api;
