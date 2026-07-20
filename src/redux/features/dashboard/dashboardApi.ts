/* eslint-disable @typescript-eslint/no-explicit-any */
import baseApi from "@/redux/api/baseApi";

const DashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    /**
     * 🔹 GET /api/v1/dashboard/overview
     * Get overall dashboard statistics
     */
    getDashboardOverview: builder.query<any, void>({
      query: () => ({
        url: "/dashboard/overview",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardOverviewQuery } = DashboardApi;

export default DashboardApi;
