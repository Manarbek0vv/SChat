import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { UsePostCommentType, UsePostType } from "../../components/types/post";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { Dispatch, SetStateAction } from "react";

type likeCommentProps = {
    comment: UsePostCommentType;
    post: UsePostType;
    user: UserState;
    myPosts: UsePostType[];
    isLiked: boolean;
    setError: Dispatch<SetStateAction<string | null>>
}

export const likeComment = createAsyncThunk(
    'user/likeComment',
    async (props: likeCommentProps, thunkApi) => {
        try {
            const findPost = props.myPosts.find(currentPost => currentPost.id === props.post.id)
            
            if (!findPost) return props.myPosts
            const newComments = findPost.comments?.map((comment) => {
                if (comment.createdAt === props.comment.createdAt) {
                    if (props.isLiked) {
                        return {...comment, likes: comment.likes.filter(likedUser => likedUser !== props.user.uid)}
                    } return {...comment, likes: [...comment.likes, props.user.uid]}
                } return comment
            })

            const sendComment = newComments?.map(comment => {
                return {...comment, author: comment.author.uid}
            })

            await updateDoc(doc(firestore, 'posts', props.post.id), {
                comments: sendComment
            })

            return props.myPosts.map((currentPost) => {
                if (currentPost.id === props.post.id) {
                    return {...currentPost, comments: newComments}
                } return currentPost
            }) as UsePostType[]
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)