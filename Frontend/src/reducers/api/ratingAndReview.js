import { apiSlice } from "./baseApi";

export const ratingAndReviewApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createRating: builder.mutation({
      query: (data) => ({
        url: "ratingAndReview/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
    editRating: builder.mutation({
      query: (data) => ({
        url: "ratingAndReview/edit",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const { useCreateRatingMutation, useEditRatingMutation } =
  ratingAndReviewApi;
