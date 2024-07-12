import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { UserState } from "../reducers/userSlice";
import { Dispatch, SetStateAction } from "react";

type LoginWithStorageProps = {
    uid: string;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export const loginWithStorage = createAsyncThunk(
    'user/loginWithStorage',
    async (props: LoginWithStorageProps, thunkApi) => {
        try {
            const response = await getDoc(doc(firestore, 'users/' + props.uid))
            if (response.exists()) {
                return response.data() as UserState
            } else {
                throw new Error('Failed to load user')
            }
        } catch (error: any) {
            thunkApi.rejectWithValue(error.message)
            props.setLoading(false)
        }
    }
)