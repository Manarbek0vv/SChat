import { FC, useEffect, useState } from "react";
import classes from './PostComments.module.scss'
import Select, { OptionType } from "../../UI/Select/Select";
import AddCommentToPost from "../AddCommentToPost/AddCommentToPost";
import { UsePostCommentType, UsePostType } from "../types/post";
import PostComment from "../PostComment/PostComment";

const ORDER_OPTIONS: OptionType[] = [
    { name: 'New ones first', value: 'NEW' },
    { name: 'Old ones first', value: 'OLD' }
]

type PostCommentsType = {
    post: UsePostType;
}

const PostComments: FC<PostCommentsType> = ({ post }) => {
    const [currentComments, setCurrentComments] = useState<UsePostCommentType[]>([])
    const [limit, setLimit] = useState(5)

    const [order, setOrder] = useState<OptionType>(ORDER_OPTIONS[0])

    const getOrderedComments = () => {
        if (post.comments === null) return []
        if (order === ORDER_OPTIONS[0]) {
            return [...(post.comments)].sort((a, b) => b.createdAt - a.createdAt)
        } else { return [...(post.comments)].sort((a, b) => a.createdAt - b.createdAt) }
    }

    useEffect(() => {
        setCurrentComments(getOrderedComments().slice(0, limit))
    }, [limit, order, post])

    return (
        <div className={classes.container}>
            <hr />

            {!!currentComments.length && <Select defaultValue={0} options={ORDER_OPTIONS} setValue={setOrder} />}

            <div className={classes.comments}>
                {!!currentComments.length &&
                    currentComments.map((comment, index) => {
                        return <PostComment comment={comment} post={post} key={index} />
                    })}
            </div>

            {(post.comments && (limit < post.comments.length)) && (
                <div className={classes['show-more']} onClick={() => setLimit(prev => prev + 5)}>
                    Show more
                </div>
            )}

            <AddCommentToPost post={post} />
        </div>
    )
}

export default PostComments