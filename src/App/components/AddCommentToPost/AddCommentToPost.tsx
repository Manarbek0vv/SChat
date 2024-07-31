import React, { FC, useContext, useRef, useState } from "react";
import classes from './AddCommentToPost.module.scss';
import { useAppSelector } from "../../hooks/redux";
import { RiSendPlaneFill } from "react-icons/ri";
import { addComment } from "../../store/thunk/addComment";
import { UserState } from "../../store/reducers/userSlice";
import { SendPostCommentType, UsePostAuthorType, UsePostCommentType, UsePostType } from "../types/post";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { PostsContext } from "../AllPosts/AllPosts";

type AddCommentToPostProps = {
    post: UsePostType;
}

const AddCommentToPost: FC<AddCommentToPostProps> = ({ post }) => {
    const { user } = useAppSelector(value => value.user)
    const Context = useContext(PostsContext)

    const [error, setError] = useState<string | null>(null)

    const [commentValue, setCommentValue] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCommentValue(e.target.value)
        if (inputRef.current) {
            inputRef.current.style.height = 'auto'
            inputRef.current.style.height = `${inputRef.current.scrollHeight}px`
        }
    }

    const onEnterDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.code === 'Enter') {
            addCommentHandler()
            setCommentValue('')
        }
    }

    const addCommentHandler = () => {
        if (!user || !Context) return
        if (!commentValue.length) { setError('Write something'); return }

        setCommentValue('')

        const sendComment: SendPostCommentType = {
            description: commentValue,
            likes: [],
            dislikes: [],
            createdAt: Date.now(),
            author: user.uid
        }

        const saveCommentAuthor: UsePostAuthorType = {
            username: user.username,
            avatar: user.avatar,
            uid: user.uid
        }

        const saveComment: UsePostCommentType = {
            description: commentValue,
            likes: [],
            dislikes: [],
            createdAt: Date.now(),
            author: saveCommentAuthor
        }

        addComment({ post, setError, user: user as UserState, sendComment, saveComment, posts: Context.posts, setPosts: Context.setPosts })
    }
    
    return (
        <div className={classes.container}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}
            <div className={classes.avatar}>
                {user?.avatar && <img src={user.avatar} alt="" className={classes.inner} />}
            </div>

            <div className={classes['input-wrapper']}>
                <input onKeyDown={onEnterDown} value={commentValue} onInput={onInput} ref={inputRef} className={classes.input} placeholder="Write a comment..." />
            </div>

            <RiSendPlaneFill className={classes.send} onClick={addCommentHandler} />
        </div>
    )
}

export default AddCommentToPost