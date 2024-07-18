import { UserState } from "../reducers/userSlice";
import { UsePostCommentType, UsePostType } from "../../components/types/post";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { Dispatch, SetStateAction } from "react";

type DislikeCommentProps = {
    comment: UsePostCommentType;
    post: UsePostType;
    user: UserState;
    posts: UsePostType[];
    isDisliked: boolean;
    setError: Dispatch<SetStateAction<string | null>>;
    setPosts: React.Dispatch<React.SetStateAction<UsePostType[]>>;
}

export const dislikeComment = async (props: DislikeCommentProps) => {
    try {
        const findPost = props.posts.find(currentPost => currentPost.id === props.post.id)

        if (!findPost) return props.posts

        const newComments = findPost.comments?.map((comment) => {
            if (comment.createdAt === props.comment.createdAt) {
                if (props.isDisliked) {
                    return { ...comment, dislikes: comment.dislikes.filter(dislikedUser => dislikedUser !== props.user.uid) }
                } return { ...comment, dislikes: [...comment.dislikes, props.user.uid] }
            } return comment
        })

        const sendComment = newComments?.map(comment => {
            return { ...comment, author: comment.author.uid }
        })

        await updateDoc(doc(firestore, 'posts', props.post.id), {
            comments: sendComment
        })

        const newPosts = props.posts.map((currentPost) => {
            if (currentPost.id === props.post.id) {
                return { ...currentPost, comments: newComments }
            } return currentPost
        }) as UsePostType[]

        props.setPosts(newPosts)
        return newPosts
    } catch (error: any) {
        props.setError(error.message)
    }
}
