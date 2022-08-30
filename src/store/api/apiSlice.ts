import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react'
import { deleteToken } from '..'
import { signOut } from '..'
import { RootState } from '../store'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:4000/api',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).accessToken.token
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        
        return headers
    }
})

const baseQueryAuthValidation: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    const result = await baseQuery(args, api, extraOptions)

    if (result?.error?.data === "jwt expired") {
        api.dispatch(deleteToken())
        api.dispatch(signOut())
    }

    return result
}

const apiSlice = createApi({
    baseQuery: baseQueryAuthValidation,
    tagTypes: ['Contact'],
    endpoints: builder => ({})
})

export default apiSlice