import { Dispatch, SetStateAction } from "react";
import { UserState } from "../reducers/userSlice";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { UsePostType } from "../../components/types/post";
import { createAsyncThunk } from "@reduxjs/toolkit";

type LikePostProps = {
    setError: Dispatch<SetStateAction<string | null>>;
    isLiked: boolean;
    user: UserState;
    post: UsePostType;
    myPosts: UsePostType[];
}

export const likePost = createAsyncThunk(
    'user/likePost',
    async (props: LikePostProps, thunkApi) => {
        try {
            if (props.isLiked) {
                await updateDoc(doc(firestore, 'posts', props.post.id), {
                    likes: arrayRemove(props.user.uid)
                })
                return props.myPosts.map(currentPost => {
                    if (currentPost.id === props.post.id) {
                        return {...currentPost, likes: currentPost.likes.filter(cp => cp !== props.user.uid)}
                    } return currentPost
                })
            } else {
                await updateDoc(doc(firestore, 'posts', props.post.id), {
                    likes: arrayUnion(props.user.uid)
                })
                return props.myPosts.map(currentPost => {
                    if (currentPost.id === props.post.id) {
                        return {...currentPost, likes: [...currentPost.likes, props.user.uid]}
                    } return currentPost
                })
            }

        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)