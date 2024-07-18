import { Dispatch, SetStateAction } from "react";
import { UserState } from "../reducers/userSlice";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { SendPostCommentType, UsePostCommentType, UsePostType } from "../../components/types/post";

type AddCommentType = {
    post: UsePostType;
    user: UserState;
    setError: Dispatch<SetStateAction<string | null>>;
    sendComment: SendPostCommentType;
    saveComment: UsePostCommentType;
    posts: UsePostType[];
    setPosts: React.Dispatch<React.SetStateAction<UsePostType[]>>
}

export const addComment = async (props: AddCommentType) => {
    try {
        await updateDoc(doc(firestore, 'posts', props.post.id), {
            comments: arrayUnion(props.sendComment)
        })

        const newPosts = props.posts.map(post => {
            if (post.id === props.post.id) {
                if (post.comments)
                    return { ...post, comments: [...post.comments, props.saveComment] }
            } return post
        })
        props.setPosts(newPosts)
    } catch (error: any) {
        props.setError(error.message)
    }
}