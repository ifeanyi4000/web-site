'use client'
import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./features/auth/authSlice"
import { apiSlice } from "./features/api/apiSlice"



export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false,
})

// call the user function on every page load

const initializeApp = async () => {
    await store.dispatch(apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true }))
}

initializeApp()