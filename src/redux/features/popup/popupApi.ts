/* eslint-disable @typescript-eslint/no-explicit-any */

import {  POPUP_ENDPOINTS, CACHE_TAGS } from "@/lib/constants";
import baseApi from "@/redux/api/baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /**
     * 🔹 POST /api/v1/Popup/create
     * Create new Popup (Admin only)
     */
    createPopup: builder.mutation<any, any>({
      query: (formData) => ({
        url: POPUP_ENDPOINTS.CREATE,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [CACHE_TAGS.POPUP],
    }),

    /**
     * 🔹 GET /api/v1/Popup/find
     * Get all Popups (Authenticated)
     */
    getAllPopups: builder.query<
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
    url: POPUP_ENDPOINTS.FIND_ALL,
    method: "GET",
    params: {
      page,
      limit,
      search,
      status,
      isTrash,
    },
  }),
  providesTags: [CACHE_TAGS.POPUP],
}),


    /**
     * 🔹 GET /api/v1/Popup/find-single/:slug
     * Get single Popup by slug
     */
    getSinglePopupBySlug: builder.query<any, string>({
      query: (slug) => ({
        url: POPUP_ENDPOINTS.FIND_SINGLE(slug),
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.POPUP],
    }),

    /**
     * 🔹 PUT /api/v1/Popup/update/:id
     * Update Popup details (Admin only)
     */
    updatePopup: builder.mutation<any, { id: string; payload: any }>({
      query: ({ id, payload }) => ({
        url: POPUP_ENDPOINTS.UPDATE(id),
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [CACHE_TAGS.POPUP],
    }),

    /**
     * 🔹 PUT /api/v1/Popup/status/:id
     * Update Popup active status (Admin only)
     */
    updatePopupStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: POPUP_ENDPOINTS.STATUS(id),
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [CACHE_TAGS.POPUP],
    }),

    /**
     * 🔹 PUT /api/v1/Popup/trash/:id
     * Move Popup to trash / restore (Admin only)
     */
    updatePopupTrashStatus: builder.mutation<any, { id: string; isTrash: boolean }>({
      query: ({ id, isTrash }) => ({
        url: POPUP_ENDPOINTS.TRASH(id),
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: [CACHE_TAGS.POPUP],
    }),

    /**
     * 🔹 DELETE /api/v1/Popup/delete/:id
     * Permanently delete Popup (Admin only)
     */
    deletePopup: builder.mutation<any, string>({
      query: (id) => ({
        url: POPUP_ENDPOINTS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [CACHE_TAGS.POPUP],
    }),

  }),
});

export const {
  useCreatePopupMutation,
  useGetAllPopupsQuery,
  useGetSinglePopupBySlugQuery,
  useUpdatePopupMutation,
  useUpdatePopupStatusMutation,
  useUpdatePopupTrashStatusMutation,
  useDeletePopupMutation,
} = api;

export default api;
