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

    createCourse: builder.mutation({
      query: (courseData) => ({
        url: "/courses/create-course",
        method: "POST",
        body: courseData,
      }),
      invalidatesTags: ["Dashboard"],
    }),

    getAllCourses: builder.query({
      query: ({ limit, page, searchQuery, category }) => {
        return {
          url: `/courses?page=${page || 1}&limit=${limit || 10}${searchQuery ? `&searchTerm=${searchQuery}` : ""}${category ? `&category=${category}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Dashboard"],
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `/courses/${courseId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard"],
    }),
    multipleFileUploader: builder.mutation({
      query: (file) => ({
        url: `/file-uploads/file-upload`,
        method: "POST",
        body: file,
      }),
    }),
    singleFileUploader: builder.mutation({
      query: (file) => ({
        url: `/file-uploads/upload-single`,
        method: "POST",
        body: file,
      }),
    }),
    deleteFile: builder.mutation({
      query: (fileId) => ({
        url: `/file-uploads/multiple-delete`,
        method: "DELETE",
        body: { fileId },
      }),
    }),
  }),
});

export const {
  useGetDashboardStatsQuery,
  useGetAllUserQuery,
  useActiveOrSuspendedUserMutation,
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useDeleteCourseMutation,
  useDeleteFileMutation,
  useMultipleFileUploaderMutation,
  useSingleFileUploaderMutation,
} = dashboardApi;
