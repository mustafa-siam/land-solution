// lib/constants.ts
/**
 * API Configuration Constants
 */

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

// API Endpoints
export const API_ENDPOINTS = {
  USERS: "/users",
  USER_BY_ID: (id: string) => `/users/${id}`,
} as const;

/**
 * 🖼️ Image Gallery Endpoints
 */

export const REVIEW_ENDPOINTS = {
  CREATE: "/review/create",
  FIND_ALL: "/review/find",
  FIND_SINGLE: (slug: string) => `/review/find-single/${slug}`,
  UPDATE: (id: string) => `/review/update/${id}`,
  STATUS: (id: string) => `/review/status/${id}`,
  TRASH: (id: string) => `/review/trash/${id}`,
  DELETE: (id: string) => `/review/delete/${id}`,
} as const;

export const BLOG_ENDPOINTS = {
  CREATE: "/blog/create",
  FIND_ALL: "/blog/find",
  FIND_SINGLE: (slug: string) => `/blog/find-single/${slug}`,
  UPDATE: (id: string) => `/blog/update/${id}`,
  STATUS: (id: string) => `/blog/status/${id}`,
  TRASH: (id: string) => `/blog/trash/${id}`,
  DELETE: (id: string) => `/blog/delete/${id}`,
} as const;

export const CATEGORY_ENDPOINTS = {
  CREATE: "/category/create",
  FIND_ALL: "/category/find",
  FIND_SINGLE: (slug: string) => `/category/find-single/${slug}`,
  UPDATE: (id: string) => `/category/update/${id}`,
  STATUS: (id: string) => `/category/status/${id}`,
  TRASH: (id: string) => `/category/trash/${id}`,
  DELETE: (id: string) => `/category/delete/${id}`,
} as const;

export const AREA_ENDPOINTS = {
  CREATE: "/area/create",
  FIND_ALL: "/area/find",
  FIND_SINGLE: (slug: string) => `/area/find-single/${slug}`,
  UPDATE: (id: string) => `/area/update/${id}`,
  STATUS: (id: string) => `/area/status/${id}`,
  TRASH: (id: string) => `/area/trash/${id}`,
  DELETE: (id: string) => `/area/delete/${id}`,
} as const;

export const POPUP_ENDPOINTS = {
  CREATE: "/popup/create",
  FIND_ALL: "/popup/find",
  FIND_SINGLE: (slug: string) => `/popup/find-single/${slug}`,
  UPDATE: (id: string) => `/popup/update/${id}`,
  STATUS: (id: string) => `/popup/status/${id}`,
  TRASH: (id: string) => `/popup/trash/${id}`,
  DELETE: (id: string) => `/popup/delete/${id}`,
} as const;

export const PRODUCT_ENDPOINTS = {
  CREATE: "/product/create",
  FIND_ALL: "/product/find",
  FIND_SINGLE: (slug: string) => `/product/find-single/${slug}`,
  UPDATE: (id: string) => `/product/update/${id}`,
  STATUS: (id: string) => `/product/status/${id}`,
  TRASH: (id: string) => `/product/trash/${id}`,
  VERIFICATION: (id: string) => `/product/verification/${id}`,
  RECOMMENDATION: (id: string) => `/product/recommendation/${id}`,
  DELETE: (id: string) => `/product/delete/${id}`,
} as const;

export const CONTACT_FOR_PRODUCT_ENDPOINTS = {
  CREATE: "/contact-for-product/create",
  FIND_ALL: "/contact-for-product/find",
  FIND_SINGLE: (slug: string) => `/contact-for-product/find-single/${slug}`,
  UPDATE: (id: string) => `/contact-for-product/update/${id}`,
  STATUS: (id: string) => `/contact-for-product/status/${id}`,
  TRASH: (id: string) => `/contact-for-product/trash/${id}`,
  DELETE: (id: string) => `/contact-for-product/delete/${id}`,
} as const;



// RTK Query Cache Tags
export const CACHE_TAGS = {
  USERS: "Users",
  REVIEW: "Review",
  BLOG: "Blog",
  POPUP: "Popup",
  CATEGORY: "Category",
  AREA: "AREA",
  PRODUCT: "Product",
  CONTACT_FOR_PRODUCT: "ContactForProduct",
} as const;
