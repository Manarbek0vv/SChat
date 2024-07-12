import { Dispatch, SetStateAction } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { UserState } from "../reducers/userSlice";
import { firestore } from "../../../main";
import { UsePostType } from "../../components/types/post";
import { createAsyncThunk } from "@reduxjs/toolkit";

type DislikePostProps = {
    setError: Dispatch<SetStateAction<string | null>>;
    isDisliked: boolean;
    user: UserState;
    post: UsePostType;
    myPosts: UsePostType[];
}

export const dislikePost = createAsyncThunk(
    'user/dislikePost',
    async (props: DislikePostProps, thunkApi) => {
        try {
            if (props.isDisliked) {
                await updateDoc(doc(firestore, 'posts', props.post.id), {
                    dislikes: arrayRemove(props.user.uid)
                })
                return props.myPosts.map(currentPost => {
                    if (currentPost.id === props.post.id) {
                        return { ...currentPost, dislikes: currentPost.dislikes.filter(cp => cp !== props.user.uid) }
                    } return currentPost
                })

                
            } else {
                await updateDoc(doc(firestore, 'posts', props.post.id), {
                    dislikes: arrayUnion(props.user.uid)
                })
                return props.myPosts.map(currentPost => {
                    if (currentPost.id === props.post.id) {
                        return { ...currentPost, dislikes: [...currentPost.dislikes, props.user.uid] }
                    } return currentPost
                })
            }

        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)