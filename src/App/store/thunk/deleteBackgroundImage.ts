import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { firestore } from "../../../main";

type DeleteBackgroundImageProps = {
    setError: Dispatch<SetStateAction<string | null>>;
    uid: string;
}

export const deleteBackgroundImage = createAsyncThunk(
    'user/deleteBackgroundImage',
    async (props: DeleteBackgroundImageProps, thunkApi) => {
        try {
            const userRef = doc(firestore, 'users', props.uid)
            await updateDoc(userRef, {
                backgroundImage: null
            })
            props.setError('You have successfully deleted the background')
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)