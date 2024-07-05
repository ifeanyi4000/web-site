import { apiSlice } from "../api/apiSlice";

export const privacyApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllPrivacy: builder.query({
            query: () => ({
                url: "get-privacy",
                method: "GET",
                credentials: "include" as const
            })
        }),
        editPolicy: builder.mutation({
            query: ({ id, data }) => ({
                url: `update-privacy/${id}`,
                method: "PUT",
                body: data,
                credentials: "include" as const
            })
        }),

    })
})

export const {
    useGetAllPrivacyQuery,
    useEditPolicyMutation
} = privacyApi;