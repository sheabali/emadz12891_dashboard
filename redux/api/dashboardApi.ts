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

    getSingleCourse: builder.query({
      query: (courseId) => ({
        url: `/courses/${courseId}`,
        method: "GET",
      }),
    }),
    updateCourse: builder.mutation({
      query: ({ id, courseData }) => ({
        url: `/courses/${id}`,
        method: "PATCH",
        body: courseData,
      }),
      invalidatesTags: ["Dashboard"],
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

    // Challenge management endpoints can be added here similarly

    addChallenge: builder.mutation({
      query: (challengeData) => ({
        url: "/challenges/create-challenge",
        method: "POST",
        body: challengeData,
      }),
      invalidatesTags: ["Dashboard"],
    }),
    getSingleChallenge: builder.query({
      query: (challengeId) => ({
        url: `/challenges/${challengeId}`,
        method: "GET",
      }),
    }),

    updateChallenge: builder.mutation({
      query: ({ id, challengeData }) => ({
        url: `/challenges/${id}`,
        method: "PATCH",
        body: challengeData,
      }),
      invalidatesTags: ["Dashboard"],
    }),

    getAllChallenges: builder.query({
      query: ({ limit, page, searchQuery, difficulty }) => {
        return {
          url: `/challenges?page=${page || 1}&limit=${limit || 10}${searchQuery ? `&searchTerm=${searchQuery}` : ""}${difficulty ? `&difficulty=${difficulty}` : ""}`,
          method: "GET",
        };
      },
      providesTags: ["Dashboard"],
    }),
    deleteChallenge: builder.mutation({
      query: (challengeId) => ({
        url: `/challenges/${challengeId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dashboard"],
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
  useGetSingleCourseQuery,
  useUpdateCourseMutation,
  // challenges api
  useAddChallengeMutation,
  useGetAllChallengesQuery,
  useDeleteChallengeMutation,
  useGetSingleChallengeQuery,
  useUpdateChallengeMutation,
} = dashboardApi;
