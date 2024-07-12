import { createAsyncThunk } from "@reduxjs/toolkit";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { firestore } from "../../../main";

type PhotoCommentType = {
    uid: string;
    description: string;
    likes: string[];
    dislakes: string[];
}

export type PhotoType = {
    url: string;
    likes: string[],
    dislikes: string[],
    comments: PhotoCommentType[];
}

type AddPhotoProps = {
    setError: Dispatch<SetStateAction<string | null>>;
    url: PhotoType['url'];
    uid: string;
}

export const addPhoto = createAsyncThunk(
    'user/addPhoto',
    async (props: AddPhotoProps, thunkApi) => {
        try {
            const newPhoto: PhotoType = {
                url: props.url,
                likes: [],
                dislikes: [],
                comments: []
            }
            const userRef = doc(firestore, 'users', props.uid)
            await updateDoc(userRef, {
                photos: arrayUnion(newPhoto)
            })
            return newPhoto
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)