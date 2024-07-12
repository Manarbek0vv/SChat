import { createAsyncThunk } from "@reduxjs/toolkit";
import { Dispatch, SetStateAction } from "react";
import { arrayUnion, doc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { UserState } from "../reducers/userSlice";
import { SendPostType } from "../../components/types/post";

type AddNewPostProps = {
    user: UserState;
    newPost: SendPostType;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const addNewPost = createAsyncThunk(
    'user/addNewPost',
    async (props: AddNewPostProps, thunkApi) => {
        try {
            await setDoc(doc(firestore, 'posts', props.newPost.id), props.newPost)
            await updateDoc(doc(firestore, 'users', props.user.uid), {
                posts: arrayUnion(props.newPost.id)
            })
            return props.newPost.id
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)