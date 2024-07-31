import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { firestore, storage } from "../../../main";
import { ref, uploadString } from "firebase/storage";

type UpdateBackgroundImageProps = {
    setError: Dispatch<SetStateAction<string | null>>;
    url: string;
    uid: string;
}

export const updateBackgroundImage = createAsyncThunk(
    'user/updateBackgroundImage',
    async (props: UpdateBackgroundImageProps, thunkApi) => {
        try {
            const userRef = doc(firestore, 'users', props.uid)

            const backgroundImageRef = `images/${props.uid}backgroundImage`
            await uploadString(ref(storage, backgroundImageRef), props.url, 'data_url')

            await updateDoc(userRef, {
                backgroundImage: backgroundImageRef
            })
            props.setError('You have successfully updated your background')
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)