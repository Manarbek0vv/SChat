import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createUser } from "../thunk/createUser";
import { loginUser } from "../thunk/loginUser";

type UserState = {
    uid: string;
    username: string;
    email: string;
}

type UserSliceState = {
    user: UserState | null;
}

const initialState: UserSliceState = {
    user: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
            if (action.payload) state.user = action.payload
        })
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
            if (action.payload) state.user = action.payload
        })
    }
})