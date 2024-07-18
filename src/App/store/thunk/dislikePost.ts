import { Dispatch, SetStateAction } from "react";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { UserState } from "../reducers/userSlice";
import { firestore } from "../../../main";
import { UsePostType } from "../../components/types/post";

type DislikePostProps = {
    setError: Dispatch<SetStateAction<string | null>>;
    isDisliked: boolean;
    user: UserState;
    post: UsePostType;
    posts: UsePostType[];
    setPosts: React.Dispatch<React.SetStateAction<UsePostType[]>>;
}

export const dislikePost = async (props: DislikePostProps) => {
    try {
        if (props.isDisliked) {
            await updateDoc(doc(firestore, 'posts', props.post.id), {
                dislikes: arrayRemove(props.user.uid)
            })
            const newPosts = props.posts.map(currentPost => {
                if (currentPost.id === props.post.id) {
                    return { ...currentPost, dislikes: currentPost.dislikes.filter(cp => cp !== props.user.uid) }
                } return currentPost
            })

            props.setPosts(newPosts)
            return newPosts
        } else {
            await updateDoc(doc(firestore, 'posts', props.post.id), {
                dislikes: arrayUnion(props.user.uid)
            })
            const newPosts = props.posts.map(currentPost => {
                if (currentPost.id === props.post.id) {
                    return { ...currentPost, dislikes: [...currentPost.dislikes, props.user.uid] }
                } return currentPost
            })

            props.setPosts(newPosts)
            return newPosts
        }

    } catch (error: any) {
        props.setError(error.message)
    }
}
