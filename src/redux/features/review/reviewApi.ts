/* eslint-disable @typescript-eslint/no-explicit-any */

import { REVIEW_ENDPOINTS, CACHE_TAGS } from "@/lib/constants";
import baseApi from "@/redux/api/baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /**
     * 🔹 POST /api/v1/Review/create
     * Create new Review (Admin only)
     */
    createReview: builder.mutation<any, any>({
      query: (formData) => ({
        url: REVIEW_ENDPOINTS.CREATE,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [CACHE_TAGS.REVIEW],
    }),

    /**
     * 🔹 GET /api/v1/Review/find
     * Get all Reviews (Authenticated)
     */
    getAllReviews: builder.query<
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
    url: REVIEW_ENDPOINTS.FIND_ALL,
    method: "GET",
    params: {
      page,
      limit,
      search,
      status,
      isTrash,
    },
  }),
  providesTags: [CACHE_TAGS.REVIEW],
}),


    /**
     * 🔹 GET /api/v1/Review/find-single/:slug
     * Get single Review by slug
     */
    getSingleReviewBySlug: builder.query<any, string>({
      query: (slug) => ({
        url: REVIEW_ENDPOINTS.FIND_SINGLE(slug),
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.REVIEW],
    }),

    /**
     * 🔹 PUT /api/v1/Review/update/:id
     * Update Review details (Admin only)
     */
    updateReview: builder.mutation<any, { id: string; payload: any }>({
      query: ({ id, payload }) => ({
        url: REVIEW_ENDPOINTS.UPDATE(id),
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [CACHE_TAGS.REVIEW],
    }),

    /**
     * 🔹 PUT /api/v1/Review/status/:id
     * Update Review active status (Admin only)
     */
    updateReviewStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: REVIEW_ENDPOINTS.STATUS(id),
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [CACHE_TAGS.REVIEW],
    }),

    /**
     * 🔹 PUT /api/v1/Review/trash/:id
     * Move Review to trash / restore (Admin only)
     */
    updateReviewTrashStatus: builder.mutation<any, { id: string; isTrash: boolean }>({
      query: ({ id, isTrash }) => ({
        url: REVIEW_ENDPOINTS.TRASH(id),
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: [CACHE_TAGS.REVIEW],
    }),

    /**
     * 🔹 DELETE /api/v1/Review/delete/:id
     * Permanently delete Review (Admin only)
     */
    deleteReview: builder.mutation<any, string>({
      query: (id) => ({
        url: REVIEW_ENDPOINTS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [CACHE_TAGS.REVIEW],
    }),

  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewsQuery,
  useGetSingleReviewBySlugQuery,
  useUpdateReviewMutation,
  useUpdateReviewStatusMutation,
  useUpdateReviewTrashStatusMutation,
  useDeleteReviewMutation,
} = api;

export default api;
