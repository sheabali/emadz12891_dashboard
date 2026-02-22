import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
    }),
    getAllUser: builder.query({
      query: () => ({
        url: "/users/admin/users",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetDashboardStatsQuery, useGetAllUserQuery } = dashboardApi;
