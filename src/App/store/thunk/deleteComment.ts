import { Dispatch, SetStateAction } from "react";
import { UserState } from "../reducers/userSlice";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { SendPostCommentType, UsePostType } from "../../components/types/post";
import { createAsyncThunk } from "@reduxjs/toolkit";

type DeleteCommentType = {
    post: UsePostType;
    user: UserState;
    setError: Dispatch<SetStateAction<string | null>>;
    deletedComment: SendPostCommentType;
    myPosts: UsePostType[];
}

export const deleteComment = createAsyncThunk(
    'user/deleteComment',
    async (props: DeleteCommentType) => {
        try {
            await updateDoc(doc(firestore, 'posts', props.post.id), {
                comments: arrayRemove(props.deletedComment)
            })

            return props.myPosts.map(post => {
                if (post.id === props.post.id && post.comments) {
                    return { ...post, comments: [...post.comments].filter((comment) => comment.createdAt !== props.deletedComment.createdAt) }
                } return post
            })
        } catch (error: any) {
            props.setError(error.message)
        }
    })