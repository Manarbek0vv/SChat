import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { UserState } from "../reducers/userSlice";

export const loginWithStorage = createAsyncThunk(
    'user/loginWithStorage',
    async (uid: string, thunkApi) => {
        try {
            const response = await getDoc(doc(firestore, 'users/' + uid))
            if (response.exists()) {
                return response.data() as UserState
            } else {
                throw new Error('Failed to load user')
            }
        } catch (error: any) {
            thunkApi.rejectWithValue(error.message)
        }
    }
)