import { Dispatch, SetStateAction } from "react";
import { UserState } from "../reducers/userSlice";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { SendPostCommentType, UsePostCommentType, UsePostType } from "../../components/types/post";
import { createAsyncThunk } from "@reduxjs/toolkit";

type AddCommentType = {
    post: UsePostType;
    user: UserState;
    setError: Dispatch<SetStateAction<string | null>>;
    sendComment: SendPostCommentType;
    saveComment: UsePostCommentType;
    myPosts: UsePostType[];
}

export const addComment = createAsyncThunk(
    'user/addComment',
    async (props: AddCommentType) => {
        try {
            await updateDoc(doc(firestore, 'posts', props.post.id), {
                comments: arrayUnion(props.sendComment)
            })

            return props.myPosts.map(post => {
                if (post.id === props.post.id) {
                    if (post.comments)
                    return { ...post, comments: [...post.comments, props.saveComment] }
                } return post
            })
        } catch (error: any) {
            props.setError(error.message)
        }
    })