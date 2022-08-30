import { createSlice, PayloadAction, ThunkDispatch } from "@reduxjs/toolkit"
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/dist/query"
import { PromiseWithKnownReason } from "@reduxjs/toolkit/dist/query/core/buildMiddleware/types"
import { QueryFulfilledRejectionReason } from "@reduxjs/toolkit/dist/query/endpointDefinitions"
import apiSlice from "../api/apiSlice"
import { RootState } from "../store"
import { setToken } from "./accessTokenSlice"
import { setRequestError } from "./errorSlice"

type RegisterAccessToken = (
    fulfilledQueryPromise: PromiseWithKnownReason<{
        data: {
            accessToken: string
            user: User
        }
        meta: {} | undefined
    }, QueryFulfilledRejectionReason<BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, {}>>>, dispatch: ThunkDispatch<RootState, any, any>
) => Promise<void>

const registerAccessToken: RegisterAccessToken = async (queryFulfilled, dispatch) => {
    try {
        dispatch(setRequestError(null))
        const { data } = await queryFulfilled
        if (data.hasOwnProperty('accessToken')) {
            dispatch(setToken(data.accessToken))
            dispatch(setUser(data.user))
        }
    } catch (err: any) {
        dispatch(setRequestError(err.error.data))
    }
}

type SignInCredentials = {
    email: string
    password: string
}

type User = {
    email?: string,
    name?: string,
    id?: number
}

const initialState: User = {}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser(_state, action: PayloadAction<User>) {
            return action.payload
        },
        signOut() {
            return initialState
        }
    }
})

const userApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        signIn: build.mutation<{ accessToken: string, user: User }, SignInCredentials>({
            query: credentials => ({
                url: '/signin',
                method: 'POST',
                body: credentials
            }),
            onQueryStarted: async (_arg, { queryFulfilled, dispatch }) => {
                await registerAccessToken(queryFulfilled, dispatch)
            }
        }),
        signUp: build.mutation<{ accessToken: string, user: User }, SignInCredentials & { name: string }>({
            query: credentials => ({
                url: '/register',
                method: 'POST',
                body: credentials
            }),
            onQueryStarted: async (_arg, { queryFulfilled, dispatch }) => {
                await registerAccessToken(queryFulfilled, dispatch)
            }
        })
    })
})

export const { useSignInMutation, useSignUpMutation } = userApiSlice

export const { setUser, signOut } = userSlice.actions

export const getUser = (state: RootState) => state.user

export default userSlice.reducer

