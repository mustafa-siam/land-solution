"use client";

import { API_BASE_URL, CACHE_TAGS } from "@/lib/constants";
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

// Global variable to store the getToken function from Clerk
let getClerkToken: (() => Promise<string | null>) | null = null;

/**
 * Set the Clerk token getter function
 * This should be called from a component that has access to useAuth()
 */
export const setClerkTokenGetter = (
  getter: () => Promise<string | null>
) => {
  getClerkToken = getter;
};

/**
 * Base query configuration with Clerk authentication
 */
const baseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: async (headers) => {
    try {
      // Get token from Clerk
      if (getClerkToken) {
        const token = await getClerkToken();
        
        if (token) {
          headers.set("Authorization", `Bearer ${token}`);
        }
      }

      // Standard HTTP headers
      // headers.set("Content-Type", "application/json");
      headers.set("Accept", "application/json");

      return headers;
    } catch (error) {
      console.error("Error preparing headers:", error);
      return headers;
    }
  },
});

/**
 * Base query with re-authentication logic
 * Handles token refresh and authentication errors
 */
const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Attempt the initial query
  let result = await baseQuery(args, api, extraOptions);

  // Handle authentication errors (401)
  if (result.error && result.error.status === 401) {
    console.warn("Authentication error detected, attempting to refresh token...");

    try {
      // Force a token refresh by getting a new token
      if (getClerkToken) {
        await getClerkToken();
        
        // Retry the original query with new token
        result = await baseQuery(args, api, extraOptions);
      } else {
        console.error("No Clerk token getter available");
        
        // Redirect to sign-in if no token getter
        if (typeof window !== "undefined") {
          window.location.href = "/sign-in";
        }
      }
    } catch (error) {
      console.error("Token refresh failed:", error);
      
      // Redirect to sign-in on refresh failure
      if (typeof window !== "undefined") {
        window.location.href = "/sign-in";
      }
    }
  }

  // Handle other errors
  if (result.error) {
    // Log errors for debugging
    console.error("API Error:", {
      status: result.error.status,
      data: result.error.data,
      endpoint: typeof args === "string" ? args : args.url,
    });

    // Handle specific error cases
    switch (result.error.status) {
      case 403:
        console.error("Access forbidden - insufficient permissions");
        // Optional: Show a toast notification
        break;
      case 404:
        console.error("Resource not found");
        break;
      case 500:
        console.error("Internal server error");
        break;
      case "FETCH_ERROR":
        console.error("Network error - please check your connection");
        break;
      case "PARSING_ERROR":
        console.error("Error parsing response");
        break;
    }
  }

  return result;
};

/**
 * Main RTK Query API instance
 * - Handles all API communications
 * - Manages caching with tags
 * - Integrates with Clerk authentication
 * - Handles token refresh automatically
 * - Provides optimistic updates and cache management
 */
const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: Object.values(CACHE_TAGS),
  endpoints: () => ({}),
  
  // Cache configuration
  keepUnusedDataFor: 60, // Keep unused data for 60 seconds
  refetchOnMountOrArgChange: 30, // Refetch if data is older than 30 seconds
  refetchOnReconnect: true, // Refetch when reconnecting
  refetchOnFocus: false, // Don't refetch on window focus (can be enabled if needed)
});

export default baseApi;