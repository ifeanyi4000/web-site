import { apiSlice } from "../api/apiSlice";

export const privacyPaymentApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getPaymentAllPrivacy: builder.query({
            query: () => ({
                url: "get-payment-privacy",
                method: "GET",
                credentials: "include" as const
            })
        }),
        editPaymentPolicy: builder.mutation({
            query: ({ id, data }) => ({
                url: `update-payment-privacy/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const
            })
        }),

    })
})

export const {
    useGetPaymentAllPrivacyQuery,
    useEditPaymentPolicyMutation
} = privacyPaymentApi;