import { Dispatch, SetStateAction } from "react";
import { UserState } from "../reducers/userSlice";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { UsePostType } from "../../components/types/post";

type LikePostProps = {
    setError: Dispatch<SetStateAction<string | null>>;
    isLiked: boolean;
    user: UserState;
    post: UsePostType;
    posts: UsePostType[];
    setPosts: React.Dispatch<React.SetStateAction<UsePostType[]>>;
}

export const likePost = async (props: LikePostProps) => {
    try {
        if (props.isLiked) {
            await updateDoc(doc(firestore, 'posts', props.post.id), {
                likes: arrayRemove(props.user.uid)
            })
            const newPosts = props.posts.map(currentPost => {
                    if (currentPost.id === props.post.id) {
                        return { ...currentPost, likes: currentPost.likes.filter(cp => cp !== props.user.uid) }
                    } return currentPost
                })

            props.setPosts(newPosts)
            return newPosts
        } else {
            await updateDoc(doc(firestore, 'posts', props.post.id), {
                likes: arrayUnion(props.user.uid)
            })
            const newPosts = props.posts.map(currentPost => {
                    if (currentPost.id === props.post.id) {
                        return { ...currentPost, likes: [...currentPost.likes, props.user.uid] }
                    } return currentPost
                })

            props.setPosts(newPosts)
            return newPosts
        }

    } catch (error: any) {
        props.setError(error.message)
    }
}
