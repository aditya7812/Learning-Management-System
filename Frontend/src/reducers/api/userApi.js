import { setCredentials } from "../authSlice";
import { apiSlice } from "./baseApi";

const profileData = ({
  firstName = "",
  lastName = "",
  headline = "",
  biography = "",
  profilePicture = "",
}) => {
  const formData = new FormData();
  formData.append("firstName", firstName);
  formData.append("lastName", lastName);
  formData.append("headline", headline);
  formData.append("biography", biography);
  formData.append("profilePicture", profilePicture);
  return formData;
};
export const instructorApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    editProfile: builder.mutation({
      query: (data) => ({
        url: "profile/edit",
        method: "POST",
        body: profileData(data),
      }),
      invalidatesTags: ["User"],
    }),

    getUserDetails: builder.query({
      query: () => ({
        url: "user/getUserDetails",
        method: "GET",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["User"],
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const { accessToken } = data;
          dispatch(setCredentials(accessToken));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useEditProfileMutation, useGetUserDetailsQuery } = instructorApi;
