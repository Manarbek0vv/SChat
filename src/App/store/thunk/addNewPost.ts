import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../../main";
import { UserState } from "../reducers/userSlice";
import { ImageType, SendPostType } from "../../components/types/post";
import { ref, uploadString } from "firebase/storage";

type AddNewPostProps = {
    user: UserState;
    newPost: SendPostType;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const addNewPost = createAsyncThunk(
    'user/addNewPost',
    async (props: AddNewPostProps, thunkApi) => {
        try {
            const newImages: ImageType[] = []

            for (const image of props.newPost.images) {
                const imageRef = `images/${props.newPost.id}${image.name}`
                await uploadString(ref(storage, imageRef), image.url, 'data_url')
                newImages.push({
                    ...image,
                    url: imageRef
                })
            }

            const newPostWithUpdatedImages: SendPostType = {...props.newPost, images: newImages}

            await setDoc(doc(firestore, 'posts', props.newPost.id), newPostWithUpdatedImages)
            await updateDoc(doc(firestore, 'users', props.user.uid), {
                posts: arrayUnion(newPostWithUpdatedImages.id)
            })
            console.log("addNewPost закончен")
            return newPostWithUpdatedImages.id
        } catch (error: any) {
            console.log('catch')
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)