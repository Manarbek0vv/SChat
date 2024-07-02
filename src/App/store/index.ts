import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./reducers/userSlice";

const rootReducer = combineReducers({
    [userSlice.reducerPath]: userSlice.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']