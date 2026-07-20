/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_ENDPOINTS, CACHE_TAGS } from "@/lib/constants";
import baseApi from "../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * 🔹 GET /api/v1/users/me
     */
    getCurrentUser: builder.query<any, void>({
      query: () => ({
        url: `${API_ENDPOINTS.USERS}/me`,
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.USERS],
    }),

    /**
     * 🔹 GET /api/v1/users/role
     */
    getUserRole: builder.query<any, void>({
      query: () => ({
        url: `${API_ENDPOINTS.USERS}/role`,
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.USERS],
    }),

    /**
     * 🔹 GET /api/v1/users/stats (Admin only)
     */
    getUserStats: builder.query<any, void>({
      query: () => ({
        url: `${API_ENDPOINTS.USERS}/stats`,
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.USERS],
    }),

    /**
     * 🔹 GET /api/v1/users (Admin only)
     */
    getAllUsers: builder.query<
      any,
      { page?: number; limit?: number; search?: string }
    >({
      query: ({ page, limit, search }) => ({
        url: API_ENDPOINTS.USERS,
        method: "GET",
        params: { page, limit, search },
      }),
      providesTags: [CACHE_TAGS.USERS],
    }),

    /**
     * 🔹 GET /api/v1/users/:id
     */
    getSingleUser: builder.query<any, string>({
      query: (id) => ({
        url: API_ENDPOINTS.USER_BY_ID(id),
        method: "GET",
      }),
      providesTags: [CACHE_TAGS.USERS],
    }),

    /**
     * 🔹 PUT /api/v1/users/update/:id
     */
    updateUserProfile: builder.mutation<any, { id: string; data: any }>({
      query: ({ id, data }) => ({
        url: `${API_ENDPOINTS.USERS}/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [CACHE_TAGS.USERS],
    }),

    /**
     * 🔹 PUT /api/v1/users/:id/role (Admin only)
     */
    updateUserRole: builder.mutation<any, { id: string; role: string }>({
      query: ({ id, role }) => ({
        url: `${API_ENDPOINTS.USERS}/${id}/role`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: [CACHE_TAGS.USERS],
    }),

    /**
     * 🔹 PUT /api/v1/users/:id/status (Admin only - Ban/Unban user)
     */
    updateUserStatus: builder.mutation<any, { id: string; isActive: boolean }>({
      query: ({ id, isActive }) => ({
        url: `${API_ENDPOINTS.USERS}/${id}/status`,
        method: "PUT",
        body: { isActive },
      }),
      invalidatesTags: [CACHE_TAGS.USERS],
    }),

    /**
     * 🔹 DELETE /api/v1/users/:id
     */
    deleteUser: builder.mutation<any, string>({
      query: (id) => ({
        url: API_ENDPOINTS.USER_BY_ID(id),
        method: "DELETE",
      }),
      invalidatesTags: [CACHE_TAGS.USERS],
    }),
  }),
});

export const {
  useGetCurrentUserQuery,
  useGetUserRoleQuery,
  useGetUserStatsQuery,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserProfileMutation,
  useUpdateUserRoleMutation,
  useUpdateUserStatusMutation,
  useDeleteUserMutation,
} = userApi;

export default userApi;