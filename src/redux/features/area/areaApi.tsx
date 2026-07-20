/* eslint-disable @typescript-eslint/no-explicit-any */

import { AREA_ENDPOINTS, CACHE_TAGS } from "@/lib/constants";
import baseApi from "@/redux/api/baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /**
     * 🔹 POST /api/v1/Area/create
     * Create new Area (Admin only)
     */
    createArea: builder.mutation<any, any>({
      query: (formData) => ({
        url: AREA_ENDPOINTS.CREATE,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [CACHE_TAGS.AREA],
    }),

    /**
     * 🔹 GET /api/v1/Area/find
     * Get all Areas (Authenticated)
     */
    getAllAreas: builder.query<
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
    url: AREA_ENDPOINTS.FIND_ALL,
    method: "GET",
    params: {
      page,
      limit,
      search,
      status,
      isTrash,
    },
  }),
  providesTags: [CACHE_TAGS.AREA],
}),


    /**
     * 🔹 GET /api/v1/Area/find-single/:slug
     * Get single Area by slug
     */
    getSingleAreaBySlug: builder.query<any, string>({
      query: (slug) => ({
        url: AREA_ENDPOINTS.FIND_SINGLE(slug),
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.AREA],
    }),

    /**
     * 🔹 PUT /api/v1/Area/update/:id
     * Update Area details (Admin only)
     */
    updateArea: builder.mutation<any, { id: string; payload: any }>({
      query: ({ id, payload }) => ({
        url: AREA_ENDPOINTS.UPDATE(id),
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [CACHE_TAGS.AREA],
    }),

    /**
     * 🔹 PUT /api/v1/Area/status/:id
     * Update Area active status (Admin only)
     */
    updateAreaStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: AREA_ENDPOINTS.STATUS(id),
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [CACHE_TAGS.AREA],
    }),

    /**
     * 🔹 PUT /api/v1/Area/trash/:id
     * Move Area to trash / restore (Admin only)
     */
    updateAreaTrashStatus: builder.mutation<any, { id: string; isTrash: boolean }>({
      query: ({ id, isTrash }) => ({
        url: AREA_ENDPOINTS.TRASH(id),
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: [CACHE_TAGS.AREA],
    }),

    /**
     * 🔹 DELETE /api/v1/Area/delete/:id
     * Permanently delete Area (Admin only)
     */
    deleteArea: builder.mutation<any, string>({
      query: (id) => ({
        url: AREA_ENDPOINTS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [CACHE_TAGS.AREA],
    }),

  }),
});

export const {
  useCreateAreaMutation,
  useGetAllAreasQuery,
  useGetSingleAreaBySlugQuery,
  useUpdateAreaMutation,
  useUpdateAreaStatusMutation,
  useUpdateAreaTrashStatusMutation,
  useDeleteAreaMutation,
} = api;

export default api;
