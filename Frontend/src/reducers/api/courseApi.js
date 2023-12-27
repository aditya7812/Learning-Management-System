/* eslint-disable no-unused-vars */

import { apiSlice } from "./baseApi";

// I think RTK query is not working as expected with form data that's why we need this two functions
const dataForm = ({ subSectionId = null, file = null }) => {
  const formData = new FormData();
  formData.append("subSectionId", subSectionId);
  formData.append("videoFile", file);
  return formData;
};

const basicsDataForm = ({
  courseId,
  courseName,
  courseSubtitle,
  description,
  locale,
  instructionalLevel,
  category,
  subCategory,
  price,
  previewImage,
  promoVideo,
}) => {
  const formData = new FormData();
  formData.append("courseId", courseId);
  formData.append("courseName", courseName);
  formData.append("courseSubtitle", courseSubtitle);
  formData.append("description", description);
  formData.append("locale", locale);
  formData.append("instructionalLevel", instructionalLevel);
  formData.append("category", category);
  formData.append("subCategory", subCategory);
  formData.append("price", price);
  formData.append("previewImage", previewImage);
  formData.append("promoVideo", promoVideo);
  return formData;
};

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "course/createcourse",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    getAllCourses: builder.query({
      query: () => ({
        url: "course/getAllCourses",
      }),
      transformResponse: (response, meta, arg) => response.data,
      providesTags: ["Course"],
    }),
    getCategoryCourses: builder.query({
      query: (category) => ({
        url: `course/getCategoryCourses/${category}`,
      }),
      transformResponse: (response, meta, arg) => response.data,
      providesTags: ["Course"],
    }),
    searchCourses: builder.query({
      query: (query) => ({
        url: `course/search/${query}`,
      }),
      providesTags: ["Course"],
    }),
    getInstructorDetails: builder.query({
      query: () => ({
        url: "instructor",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Course"],
    }),
    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `course/getCourseDetails/${courseId}`,
      }),
      transformResponse: (response, meta, arg) => response.data,
      providesTags: ["Course"],
    }),
    getFullCourseDetails: builder.query({
      query: (courseId) => ({
        url: `course/getFullCourseDetails/${courseId}`,
      }),
      transformResponse: (response, meta, arg) => response.data,
      providesTags: ["Course"],
    }),

    getsections: builder.query({
      query: () => ({
        url: "course/getsections",
      }),
      providesTags: ["Course"],
      transformResponse: (response, meta, arg) => response.data,
    }),
    editCourseGoals: builder.mutation({
      query: (data) => ({
        url: "course/editCourseGoals",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    editCourseBasics: builder.mutation({
      query: (data) => ({
        url: "course/editCourseBasics",
        method: "POST",
        body: basicsDataForm(data),
      }),
      invalidatesTags: ["Course"],
    }),

    createSection: builder.mutation({
      query: (data) => ({
        url: "course/createSection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    updateSection: builder.mutation({
      query: (data) => ({
        url: "course/updateSection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    deleteSection: builder.mutation({
      query: (data) => ({
        url: "course/deleteSection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),

    createSubSection: builder.mutation({
      query: (data) => ({
        url: "course/createSubSection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    addSubSectionContent: builder.mutation({
      query: (data) => ({
        url: "course/addSubSectionContent",
        method: "POST",
        body: dataForm({
          file: data.file,
          subSectionId: data.subSectionId,
        }),
      }),
      invalidatesTags: ["Course"],
    }),
    updateSubSection: builder.mutation({
      query: (data) => ({
        url: "course/updateSubSection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteSubSection: builder.mutation({
      query: (data) => ({
        url: "course/deleteSubSection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    publishCourse: builder.mutation({
      query: (data) => ({
        url: "course/publishCourse",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useCreateCourseMutation,
  useGetAllCoursesQuery,
  useGetCourseDetailsQuery,
  useSearchCoursesQuery,
  useGetFullCourseDetailsQuery,
  useGetCategoryCoursesQuery,
  useGetInstructorDetailsQuery,
  useGetsectionsQuery,
  useEditCourseGoalsMutation,
  useEditCourseBasicsMutation,
  useCreateSectionMutation,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
  useCreateSubSectionMutation,
  useAddSubSectionContentMutation,
  useUpdateSubSectionMutation,
  useDeleteSubSectionMutation,
  usePublishCourseMutation,
} = courseApi;
