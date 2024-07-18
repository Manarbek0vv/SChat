import { FC, useContext, useRef, useState } from "react";
import classes from './PostItem.module.scss'
import { convertTimestampToString } from "../../secondaryFunctions/convertTimestampToString";
import PostImages from "../../UI/PostImages/PostImages";
import { MdDeleteOutline, MdOutlineMoreHoriz } from "react-icons/md";
import { LuSendToBack } from "react-icons/lu";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { deletePost } from "../../store/thunk/deletePost";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { RiDislikeFill } from "react-icons/ri";
import { FaRegCommentAlt } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { TiHeartFullOutline } from "react-icons/ti";
import { likePost } from "../../store/thunk/likePost";
import { UserState } from "../../store/reducers/userSlice";
import PostComments from "../PostComments/PostComments";
import { dislikePost } from "../../store/thunk/dislikePost";
import { UsePostType } from "../types/post";
import { useNavigate } from "react-router-dom";
import { PostsContext } from "../AllPosts/AllPosts";


type PostItemProps = {
    post: UsePostType;
}

const PostItem: FC<PostItemProps> = ({ post }) => {
    const { user } = useAppSelector(value => value.user)
    const Context = useContext(PostsContext)

    const navigate = useNavigate()

    const [isMoreOptionsView, setIsMoreOptionsView] = useState(false)
    const moreOptionsRef = useRef<HTMLDivElement | null>(null)

    const dispatch = useAppDispatch()
    const [error, setError] = useState<string | null>(null)

    const deletePostHandler = () => {
        if (!user || !Context) return
        dispatch(deletePost({ post, user, setError, setPosts: Context.setPosts }))
    }

    const likeLikedRef = useRef<HTMLParagraphElement | null>(null)
    const dislikeRef = useRef<HTMLParagraphElement | null>(null)

    const isLikedWithMe = post.likes.includes(user?.uid as string)
    const isDislikedWithMe = isLikedWithMe ? false : post.dislikes.includes(user?.uid as string)

    const [isCommentsVisible, setIsCommentsVisible] = useState(false)

    const onLike = async () => {
        if (!user || !Context) return

        likePost({ setError, isLiked: isLikedWithMe, user: user as UserState, post, setPosts: Context.setPosts, posts: Context.posts })
            .then((posts) => {
                if (isDislikedWithMe && posts) {
                    dislikePost({ setError, isDisliked: isDislikedWithMe, user: user as UserState, post, posts, setPosts: Context.setPosts})
                    dislikeRef.current?.classList.add(classes['dislike-disable'])
                }
            })
        likeLikedRef.current?.classList.add(classes['like-liked-disable'])
    }

    const onDislike = async () => {
        if (!user || !Context) return

        dislikePost({ setError, isDisliked: isDislikedWithMe, user: user as UserState, post, posts: Context.posts, setPosts: Context.setPosts })
            .then((posts) => {
                if (isLikedWithMe && posts) {
                    likePost({ setError, isLiked: isLikedWithMe, user: user as UserState, post, posts, setPosts: Context.setPosts})
                    likeLikedRef.current?.classList.add(classes['like-liked-disable'])

                }
            })
        dislikeRef.current?.classList.add(classes['dislike-disable'])
    }

    return (
        <>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            <div key={post.createdAt} className={classes.post}>
                <div className={classes['post-info']}>
                    <div className={classes.first}>
                        <div onClick={() => {
                            if (user?.uid !== post.author.uid) {
                                navigate(`/${post.author.uid}`)
                            }
                        }} className={classes.avatar}>
                            {post.author.avatar && <img src={post.author.avatar} alt="" className={classes['avatar-image']} />}
                        </div>

                        <div className={classes['user-info']}>
                            <p onClick={() => {
                                if (user?.uid !== post.author.uid) {
                                    navigate(`/${post.author.uid}`)
                                }
                            }} className={classes.username}>{post.author.username}</p>
                            <p className={classes.createdAt}>{convertTimestampToString(Date.now() - post.createdAt)}</p>
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
                                {post.author.uid === user?.uid && (
                                    <div className={classes.option} onClick={deletePostHandler}>
                                        <MdDeleteOutline /> Delete post
                                    </div>
                                )}
                                <div className={classes.option}>
                                    <LuSendToBack /> Complain
                                </div>
                            </div>
                        )}
                    </div>

                </div>

                <p className={classes.description}>
                    {post.description}
                </p>

                <PostImages images={post.images} />

                <div className={classes.footer}>
                    <div ref={likeLikedRef} className={`${classes.like} ${isLikedWithMe ? classes['like-liked'] : ''}`} onClick={onLike}>
                        {isLikedWithMe ?
                            (
                                <div className={classes['pin-wrapper']}>
                                    <TiHeartFullOutline className={classes.pin} />
                                </div>
                            ) : (
                                <FaRegHeart className={classes.pin} />
                            )}
                        {!post.likes.length || post.likes.length}
                    </div>

                    <div className={`${classes.dislikes} ${isDislikedWithMe ? classes['dislike-active'] : ''}`} onClick={onDislike} ref={dislikeRef}>
                        <RiDislikeFill className={classes.pin} />
                        {!post.dislikes.length || post.dislikes.length}
                    </div>

                    {post.comments && (
                        <div className={classes.comments} onClick={() => setIsCommentsVisible(prev => !prev)}>
                            <FaRegCommentAlt className={classes.pin} />
                            {!post.comments.length || post.comments.length}
                        </div>
                    )}
                </div>

                {isCommentsVisible && <PostComments post={post} />}
            </div>
        </>
    )
}

export default PostItem