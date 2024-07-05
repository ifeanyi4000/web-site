import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../auth/authSlice';
// http://localhost:7000/api/v1/
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api-web-g8tm.onrender.com/api/v1/",
  }),
  endpoints: (builder) => ({
    loadUser: builder.query({
      query: (data) => ({
        url: "me",
        method: "GET",
        credentials: "include" as const
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          dispatch(
            userLoggedIn({
              accessToken: result.data.accessToken,
              user: result.data.user,

            })
          )
        } catch (error: any) {
          console.log(error)
        }
      }
    })

  }),
});

export const { useLoadUserQuery } = apiSlice;
