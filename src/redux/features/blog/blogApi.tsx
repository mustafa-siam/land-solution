/* eslint-disable @typescript-eslint/no-explicit-any */

import { BLOG_ENDPOINTS, CACHE_TAGS } from "@/lib/constants";
import baseApi from "@/redux/api/baseApi";

const api = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    /**
     * 🔹 POST /api/v1/Blog/create
     * Create new Blog (Admin only)
     */
    createBlog: builder.mutation<any, any>({
      query: (formData) => ({
        url: BLOG_ENDPOINTS.CREATE,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: [CACHE_TAGS.BLOG],
    }),

    /**
     * 🔹 GET /api/v1/Blog/find
     * Get all Blogs (Authenticated)
     */
    getAllBlogs: builder.query<
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
    url: BLOG_ENDPOINTS.FIND_ALL,
    method: "GET",
    params: {
      page,
      limit,
      search,
      status,
      isTrash,
    },
  }),
  providesTags: [CACHE_TAGS.BLOG],
}),


    /**
     * 🔹 GET /api/v1/Blog/find-single/:slug
     * Get single Blog by slug
     */
    getSingleBlogBySlug: builder.query<any, string>({
      query: (slug) => ({
        url: BLOG_ENDPOINTS.FIND_SINGLE(slug),
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.BLOG],
    }),

    /**
     * 🔹 PUT /api/v1/Blog/update/:id
     * Update Blog details (Admin only)
     */
    updateBlog: builder.mutation<any, { id: string; payload: any }>({
      query: ({ id, payload }) => ({
        url: BLOG_ENDPOINTS.UPDATE(id),
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: [CACHE_TAGS.BLOG],
    }),

    /**
     * 🔹 PUT /api/v1/Blog/status/:id
     * Update Blog active status (Admin only)
     */
    updateBlogStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: BLOG_ENDPOINTS.STATUS(id),
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: [CACHE_TAGS.BLOG],
    }),

    /**
     * 🔹 PUT /api/v1/Blog/trash/:id
     * Move Blog to trash / restore (Admin only)
     */
    updateBlogTrashStatus: builder.mutation<any, { id: string; isTrash: boolean }>({
      query: ({ id, isTrash }) => ({
        url: BLOG_ENDPOINTS.TRASH(id),
        method: "PUT",
        body: { isTrash },
      }),
      invalidatesTags: [CACHE_TAGS.BLOG],
    }),

    /**
     * 🔹 DELETE /api/v1/Blog/delete/:id
     * Permanently delete Blog (Admin only)
     */
    deleteBlog: builder.mutation<any, string>({
      query: (id) => ({
        url: BLOG_ENDPOINTS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: [CACHE_TAGS.BLOG],
    }),

  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useGetSingleBlogBySlugQuery,
  useUpdateBlogMutation,
  useUpdateBlogStatusMutation,
  useUpdateBlogTrashStatusMutation,
  useDeleteBlogMutation,
} = api;

export default api;
