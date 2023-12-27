import { apiSlice } from "./baseApi";

export const paymentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSession: builder.mutation({
      query: (data) => ({
        url: "payment/createSession",
        method: "POST",
        body: data,
      }),
    }),
    enrollStudent: builder.query({
      query: (sessionId) => ({
        url: `payment/completePayment/${sessionId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateSessionMutation, useEnrollStudentQuery } = paymentApi;
