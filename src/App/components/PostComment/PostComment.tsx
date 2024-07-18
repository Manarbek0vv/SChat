import { FC, useContext, useRef, useState } from "react";
import classes from './PostComment.module.scss'
import { BiSolidDislike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { MdDeleteOutline, MdOutlineMoreHoriz } from "react-icons/md";
import { LuSendToBack } from "react-icons/lu";
import { convertTimestampToString } from "../../secondaryFunctions/convertTimestampToString";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { SendPostCommentType, UsePostCommentType, UsePostType } from "../types/post";
import { useAppSelector } from "../../hooks/redux";
import { deleteComment } from "../../store/thunk/deleteComment";
import { UserState } from "../../store/reducers/userSlice";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { likeComment } from "../../store/thunk/likeComment";
import { dislikeComment } from "../../store/thunk/dislikeComment";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../AllPosts/AllPosts";

type PostCommentType = {
    comment: UsePostCommentType;
    post: UsePostType;
}

const PostComment: FC<PostCommentType> = ({ comment, post }) => {
    const { user } = useAppSelector(value => value.user)
    const Context = useContext(PostsContext)
    const navigate = useNavigate()

    const [error, setError] = useState<string | null>(null)

    const [isMoreOptionsView, setIsMoreOptionsView] = useState(false)
    const moreOptionsRef = useRef<HTMLDivElement | null>(null)

    const deleteCommentHandler = () => {
        setIsMoreOptionsView(false)

        if (!Context) return
        const deletedComment: SendPostCommentType = { ...comment, author: comment.author.uid }
        deleteComment({ post, setError, user: user as UserState, deletedComment, posts: Context.posts, setPosts: Context.setPosts })
    }

    const isLiked = comment.likes.includes(user?.uid as string)
    const isDisliked = comment.dislikes.includes(user?.uid as string)

    const likeCommentHandler = () => {
        if (!Context) return
        likeComment({ posts: Context.posts, setPosts: Context.setPosts, post, comment, user: user as UserState, isLiked, setError })
            .then((posts) => {
                if (isDisliked && posts) {
                    dislikeComment({ posts, setPosts: Context.setPosts, post, comment, user: user as UserState, isDisliked, setError })
                }
            })
    }

    const dislikeCommentHandler = () => {
        if (!Context) return
        dislikeComment({ posts: Context.posts, setPosts: Context.setPosts, post, comment, user: user as UserState, isDisliked, setError })
            .then((posts) => {
                if (isLiked && posts) {
                    likeComment({ posts, setPosts: Context.setPosts, post, comment, user: user as UserState, isLiked, setError })
                }
            })
    }

    return (
        <div className={classes.comment}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            <div onClick={() => {
                if (user?.uid !== post.author.uid) {
                    navigate(`/${post.author.uid}`)
                }
            }} className={classes.avatar}>
                {comment.author.avatar && <img src={comment.author.avatar} alt="" className={classes.inner} />}
            </div>

            <div className={classes.content}>
                <div className={classes.first}>
                    <p onClick={() => {
                        if (user?.uid !== post.author.uid) {
                            navigate(`/${post.author.uid}`)
                        }
                    }} className={classes.username}>{comment.author.username}</p>
                    <p className={classes.createdAt}>{convertTimestampToString(Date.now() - comment.createdAt)}</p>
                </div>

                <p className={classes.description}>{comment.description}</p>

                <div className={classes.grade}>
                    <div className={classes.like} onClick={likeCommentHandler}>
                        {
                            comment.likes.includes(user?.uid as string) ?
                                (
                                    <BiSolidLike className={classes['pin']} />
                                ) :
                                (
                                    <BiLike className={classes.pin} />
                                )
                        }
                        {!comment.likes.length || comment.likes.length}
                    </div>

                    <div className={classes.dislike} onClick={dislikeCommentHandler}>
                        {
                            comment.dislikes.includes(user?.uid as string) ?
                                (
                                    <BiSolidDislike className={classes['pin']} />
                                ) :
                                (
                                    <BiDislike className={classes.pin} />
                                )
                        }
                        {!comment.dislikes.length || comment.dislikes.length}
                    </div>
                </div>
            </div>

            <div className={classes['more-wrapper']}>
                <MdOutlineMoreHoriz className={classes.more}
                    onClick={() => {
                        if (!isMoreOptionsView) {
                            setIsMoreOptionsView(true)
                        } else {
                            if (moreOptionsRef.current) {
                                moreOptionsRef.current.classList.add(classes['more-options-disable'])
                            }
                            setTimeout(() => setIsMoreOptionsView(false), 300)
                        }
                    }} />

                {isMoreOptionsView && (
                    <div ref={moreOptionsRef} className={classes['more-options']}>
                        {comment.author.uid === user?.uid && (
                            <div className={classes.option} onClick={deleteCommentHandler}>
                                <MdDeleteOutline /> Delete comment
                            </div>
                        )}
                        <div className={classes.option}>
                            <LuSendToBack /> Complain
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default PostComment