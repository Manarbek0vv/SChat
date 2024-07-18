import { Dispatch, SetStateAction } from "react";
import { UserState } from "../reducers/userSlice";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { SendPostCommentType, UsePostType } from "../../components/types/post";

type DeleteCommentType = {
    post: UsePostType;
    user: UserState;
    setError: Dispatch<SetStateAction<string | null>>;
    deletedComment: SendPostCommentType;
    posts: UsePostType[];
    setPosts: React.Dispatch<React.SetStateAction<UsePostType[]>>;
}

export const deleteComment = async (props: DeleteCommentType) => {
    try {
        await updateDoc(doc(firestore, 'posts', props.post.id), {
            comments: arrayRemove(props.deletedComment)
        })

        const newPosts = props.posts.map(post => {
            if (post.id === props.post.id && post.comments) {
                return { ...post, comments: [...post.comments].filter((comment) => comment.createdAt !== props.deletedComment.createdAt) }
            } return post
        })

        props.setPosts(newPosts)
    } catch (error: any) {
        props.setError(error.message)
    }
}