import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

type AccessToken = {
    token: null | string
}

const initialState: AccessToken = {
    token: null
}

const accessTokenSlice = createSlice({
    name: 'accessToken',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload
        },
        deleteToken() {
            return initialState
        }
    }
})

export default accessTokenSlice.reducer
export const {setToken, deleteToken} = accessTokenSlice.actions

export const getToken = (state: RootState) => state.accessToken.token

