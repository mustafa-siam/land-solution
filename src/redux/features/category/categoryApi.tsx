/* eslint-disable @typescript-eslint/no-explicit-any */

import { CATEGORY_ENDPOINTS, CACHE_TAGS } from "@/lib/constants";
import baseApi from "@/redux/api/baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /**
     * 🔹 POST /api/v1/Category/create
     * Create new Category (Admin only)
     */
    createCategory: builder.mutation<any, any>({
      query: (formData) => ({
        url: CATEGORY_ENDPOINTS.CREATE,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [CACHE_TAGS.CATEGORY],
    }),

    /**
     * 🔹 GET /api/v1/Category/find
     * Get all Categorys (Authenticated)
     */
    getAllCategories: builder.query<
  any,
any
>({
  query: ({
    page = 1,
    limit = 1000,
    search = "",
    status,
    isTrash,
  }) => ({
    url: CATEGORY_ENDPOINTS.FIND_ALL,
    method: "GET",
    params: {
      page,
      limit,
      search,
      status,
      isTrash,
    },
  }),
  providesTags: [CACHE_TAGS.CATEGORY],
}),


    /**
     * 🔹 GET /api/v1/Category/find-single/:slug
     * Get single Category by slug
     */
    getSingleCategoryBySlug: builder.query<any, string>({
      query: (slug) => ({
        url: CATEGORY_ENDPOINTS.FIND_SINGLE(slug),
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.CATEGORY],
    }),

    /**
     * 🔹 PUT /api/v1/Category/update/:id
     * Update Category details (Admin only)
     */
    updateCategory: builder.mutation<any, { id: string; payload: any }>({
      query: ({ id, payload }) => ({
        url: CATEGORY_ENDPOINTS.UPDATE(id),
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [CACHE_TAGS.CATEGORY],
    }),

    /**
     * 🔹 PUT /api/v1/Category/status/:id
     * Update Category active status (Admin only)
     */
    updateCategoryStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: CATEGORY_ENDPOINTS.STATUS(id),
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [CACHE_TAGS.CATEGORY],
    }),

    /**
     * 🔹 PUT /api/v1/Category/trash/:id
     * Move Category to trash / restore (Admin only)
     */
    updateCategoryTrashStatus: builder.mutation<any, { id: string; isTrash: boolean }>({
      query: ({ id, isTrash }) => ({
        url: CATEGORY_ENDPOINTS.TRASH(id),
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: [CACHE_TAGS.CATEGORY],
    }),

    /**
     * 🔹 DELETE /api/v1/Category/delete/:id
     * Permanently delete Category (Admin only)
     */
    deleteCategory: builder.mutation<any, string>({
      query: (id) => ({
        url: CATEGORY_ENDPOINTS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [CACHE_TAGS.CATEGORY],
    }),

  }),
});

export const {
  useCreateCategoryMutation,
  useGetAllCategoriesQuery,
  useGetSingleCategoryBySlugQuery,
  useUpdateCategoryMutation,
  useUpdateCategoryStatusMutation,
  useUpdateCategoryTrashStatusMutation,
  useDeleteCategoryMutation,
} = api;

export default api;
