import React, { FC, useRef, useState } from "react";
import classes from './AddCommentToPost.module.scss';
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { RiSendPlaneFill } from "react-icons/ri";
import { addComment } from "../../store/thunk/addComment";
import { UserState } from "../../store/reducers/userSlice";
import { SendPostCommentType, UsePostAuthorType, UsePostCommentType, UsePostType } from "../types/post";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";

type AddCommentToPostProps = {
    post: UsePostType;
}

const AddCommentToPost: FC<AddCommentToPostProps> = ({ post }) => {
    const { user, posts: myPosts } = useAppSelector(value => value.user)

    const dispatch = useAppDispatch()

    const [error, setError] = useState<string | null>(null)

    const [commentValue, setCommentValue] = useState('')
    const textareaRef = useRef<HTMLTextAreaElement | null>(null)

    const onInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setCommentValue(e.target.value)
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }

    const onEnterDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.code === 'Enter') {
            addCommentHandler()
        }
    }

    const addCommentHandler = () => {
        if (!user) return
        if (!commentValue.length) { setError('Write something'); return }

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

        dispatch(addComment({ post, setError, user: user as UserState, sendComment, saveComment, myPosts }))

        setCommentValue('')
    }
    
    return (
        <div className={classes.container}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}
            <div className={classes.avatar}>
                {user?.avatar && <img src={user.avatar} alt="" className={classes.inner} />}
            </div>

            <div className={classes['textarea-wrapper']}>
                <textarea onKeyDown={onEnterDown} value={commentValue} onInput={onInput} ref={textareaRef} className={classes.textarea} placeholder="Write a comment..."></textarea>
            </div>

            <RiSendPlaneFill className={classes.send} onClick={addCommentHandler} />
        </div>
    )
}

export default AddCommentToPost