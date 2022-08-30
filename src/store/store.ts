import { configureStore, combineReducers } from "@reduxjs/toolkit"
import apiSlice from "./api/apiSlice"
import accessTokenSlice from "./slices/accessTokenSlice"
import errorSlice from "./slices/errorSlice"
import userSlice from "./slices/userSlice"
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const rootReducer = combineReducers({
    user: userSlice,
    accessToken: accessTokenSlice,
    error: errorSlice,
    [apiSlice.reducerPath]: apiSlice.reducer
})

const persistConfig = {
    key: 'root',
    storage,
    blacklist: [
        // 'accessToken',
        apiSlice.reducerPath
    ]
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    devTools: true,
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }).concat(apiSlice.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export const persistor = persistStore(store)
export default store