import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { firestore, storage } from "../../../main";
import { Dispatch, SetStateAction } from "react";
import { UsePostType } from "../../components/types/post";
import { deleteObject, ref } from "firebase/storage";

type deletePostProps = {
    post: UsePostType;
    user: UserState;
    setError: Dispatch<SetStateAction<string | null>>
    setPosts: React.Dispatch<React.SetStateAction<UsePostType[]>>;
}

export const deletePost = createAsyncThunk(
    'user/deletePost',
    async (props: deletePostProps, thunkApi) => {
        try {
            await deleteDoc(doc(firestore, 'posts', props.post.id))

            for (const image of props.post.images) {
                const imageRef = `images/${props.post.id}${image.name}`
                await deleteObject(ref(storage, imageRef))
                .catch((error) => {
                    throw new Error(error)
                })
            }
            const newMyUserPosts = props.user.posts.filter((currentPost) => currentPost !== props.post.id)
            await updateDoc(doc(firestore, 'users', props.user.uid), {
                posts: newMyUserPosts
            })
            props.setPosts(prev => {
                return prev.filter(currentPost => {
                    return currentPost.id !== props.post.id
                })
            })
            return newMyUserPosts
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)