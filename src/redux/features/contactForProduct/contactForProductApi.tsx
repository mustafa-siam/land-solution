/* eslint-disable @typescript-eslint/no-explicit-any */

import {  CONTACT_FOR_PRODUCT_ENDPOINTS, CACHE_TAGS } from "@/lib/constants";
import baseApi from "@/redux/api/baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /**
     * 🔹 POST /api/v1/ContactForProduct/create
     * Create new ContactForProduct (Admin only)
     */
    createContactForProduct: builder.mutation<any, any>({
      query: (formData) => ({
        url: CONTACT_FOR_PRODUCT_ENDPOINTS.CREATE,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [CACHE_TAGS.CONTACT_FOR_PRODUCT],
    }),

    /**
     * 🔹 GET /api/v1/ContactForProduct/find
     * Get all ContactForProducts (Authenticated)
     */
    getAllContactForProducts: builder.query<
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
    url: CONTACT_FOR_PRODUCT_ENDPOINTS.FIND_ALL,
    method: "GET",
    params: {
      page,
      limit,
      search,
      status,
      isTrash,
    },
  }),
  providesTags: [CACHE_TAGS.CONTACT_FOR_PRODUCT],
}),


    /**
     * 🔹 GET /api/v1/ContactForProduct/find-single/:slug
     * Get single ContactForProduct by slug
     */
    getSingleContactForProductBySlug: builder.query<any, string>({
      query: (slug) => ({
        url: CONTACT_FOR_PRODUCT_ENDPOINTS.FIND_SINGLE(slug),
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.CONTACT_FOR_PRODUCT],
    }),

    /**
     * 🔹 PUT /api/v1/ContactForProduct/update/:id
     * Update ContactForProduct details (Admin only)
     */
    updateContactForProduct: builder.mutation<any, { id: string; payload: any }>({
      query: ({ id, payload }) => ({
        url: CONTACT_FOR_PRODUCT_ENDPOINTS.UPDATE(id),
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [CACHE_TAGS.CONTACT_FOR_PRODUCT],
    }),

    /**
     * 🔹 PUT /api/v1/ContactForProduct/status/:id
     * Update ContactForProduct active status (Admin only)
     */
    updateContactForProductStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: CONTACT_FOR_PRODUCT_ENDPOINTS.STATUS(id),
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [CACHE_TAGS.CONTACT_FOR_PRODUCT],
    }),

    /**
     * 🔹 PUT /api/v1/ContactForProduct/trash/:id
     * Move ContactForProduct to trash / restore (Admin only)
     */
    updateContactForProductTrashStatus: builder.mutation<any, { id: string; isTrash: boolean }>({
      query: ({ id, isTrash }) => ({
        url: CONTACT_FOR_PRODUCT_ENDPOINTS.TRASH(id),
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: [CACHE_TAGS.CONTACT_FOR_PRODUCT],
    }),

    /**
     * 🔹 DELETE /api/v1/ContactForProduct/delete/:id
     * Permanently delete ContactForProduct (Admin only)
     */
    deleteContactForProduct: builder.mutation<any, string>({
      query: (id) => ({
        url: CONTACT_FOR_PRODUCT_ENDPOINTS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [CACHE_TAGS.CONTACT_FOR_PRODUCT],
    }),

  }),
});

export const {
  useCreateContactForProductMutation,
  useGetAllContactForProductsQuery,
  useGetSingleContactForProductBySlugQuery,
  useUpdateContactForProductMutation,
  useUpdateContactForProductStatusMutation,
  useUpdateContactForProductTrashStatusMutation,
  useDeleteContactForProductMutation,
} = api;

export default api;
