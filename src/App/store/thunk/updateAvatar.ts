import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { firestore } from "../../../main";

type UpdateAvatarProps = {
    setError: Dispatch<SetStateAction<string | null>>;
    url: string;
    uid: string;
}

export const updateAvatar = createAsyncThunk(
    'user/updateAvatar',
    async (props: UpdateAvatarProps, thunkApi) => {
        try {
            const userRef = doc(firestore, 'users', props.uid)
            await updateDoc(userRef, {
                avatar: props.url
            })
            props.setError('You have successfully updated your photo')
            return props.url
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)