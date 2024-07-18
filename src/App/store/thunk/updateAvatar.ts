import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { firestore, imagesRef, storage } from "../../../main";
import { ref, uploadString } from "firebase/storage";

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

            const avatarRef = `images/${props.uid}avatar`
            await uploadString(ref(storage, avatarRef), props.url, 'data_url')

            await updateDoc(userRef, {
                avatar: `images/${props.uid}avatar`
            })
            props.setError('You have successfully updated your photo')
            return props.url
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)