import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { firestore } from "../../../main";

type DeleteAvatarProps = {
    setError: Dispatch<SetStateAction<string | null>>;
    uid: string;
}

export const deleteAvatar = createAsyncThunk(
    'user/deleteAvatar',
    async (props: DeleteAvatarProps, thunkApi) => {
        try {
            const userRef = doc(firestore, 'users', props.uid)
            await updateDoc(userRef, {
                avatar: null
            })
            props.setError('You have successfully deleted the photo')
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)