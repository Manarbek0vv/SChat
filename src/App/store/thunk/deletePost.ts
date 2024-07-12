import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostType } from "../../components/CreateNewPost/CreateNewPost";
import { UserState } from "../reducers/userSlice";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { Dispatch, SetStateAction } from "react";

type deletePostProps = {
    post: PostType;
    user: UserState;
    setError: Dispatch<SetStateAction<string | null>>
}

export const deletePost = createAsyncThunk(
    'user/deletePost',
    async (props: deletePostProps, thunkApi) => {
        try {
            await deleteDoc(doc(firestore, 'posts', props.post.id))
            const newMyUserPosts = props.user.posts.filter((currentPost) => currentPost !== props.post.id)
            await updateDoc(doc(firestore, 'users', props.user.uid), {
                posts: newMyUserPosts
            })
            return newMyUserPosts
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)