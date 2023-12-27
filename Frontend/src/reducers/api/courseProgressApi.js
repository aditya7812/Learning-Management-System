import { apiSlice } from "./baseApi";

export const courseProgressApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserProgress: builder.query({
      query: (courseId) => ({
        url: `courseProgress/getUserCourseProgress/${courseId}`,
      }),
      providesTags: ["CourseProgress"],
    }),
    updateCourseProgress: builder.mutation({
      query: (data) => ({
        url: "courseProgress/updateCourseProgress",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CourseProgress"],
    }),
  }),
});

export const { useGetUserProgressQuery, useUpdateCourseProgressMutation } =
  courseProgressApi;
