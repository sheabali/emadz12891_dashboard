import { baseApi } from "./baseApi";

export const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardStats: builder.query({
      query: () => ({
        url: "/dashboard/stats",
        method: "GET",
      }),
    }),

    // Admin endpoint to fetch all users with optional filters
    getAllUser: builder.query({
      query: ({ limit, page, search, status }) => {
        const params = new URLSearchParams();

        if (limit) params.append("limit", String(limit));
        if (page) params.append("page", String(page));
        if (search) params.append("searchTerm", search);
        if (status) params.append("status", status);

        return {
          url: "/users/admin/users",
          method: "GET",
          params,
        };
      },
      providesTags: ["Dashboard"],
    }),
    activeOrSuspendedUser: builder.mutation({
      query: ({ userId, status }) => ({
        url: `/users/admin/user/suspend/${userId}`,
        method: "PATCH",
        body: { status },
      }),
      invalidatesTags: ["Dashboard"],
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllUserQuery,
  useActiveOrSuspendedUserMutation,
} = dashboardApi;
