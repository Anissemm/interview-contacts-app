import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../store"

type ErrorSlice = {
    requestError: null | string
}

const initialState: ErrorSlice = {
    requestError: null
}

const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: {
        setRequestError(state, action: PayloadAction<string | null>) {
            state.requestError = action.payload
        }
    }
})


export default errorSlice.reducer

export const { setRequestError } = errorSlice.actions

export const getRequestError = (state: RootState) => state.error.requestError