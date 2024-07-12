import { FC, useEffect, useState } from "react";
import classes from './AllPosts.module.scss'
import PostItem from "../PostItem/PostItem";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import LoadingPosts from "../LoadingPosts/LoadingPosts";

type AllPostsProps = {
    callback: any;
}


const AllPosts: FC<AllPostsProps> = (props) => {
    const { user, posts: myPosts } = useAppSelector(value => value.user)
    const [ loading, setLoding ] = useState(false)

    const dispatch = useAppDispatch()


    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user) return

        setLoding(true)
        dispatch(props.callback)
        .then(() => setLoding(false))
    }, [user])

    return (
        <div className={classes.container}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            {loading && <LoadingPosts />}

            {!loading && 
            [...myPosts].sort((a, b) => b.createdAt - a.createdAt)
            .map(post => {
                return (
                    <PostItem key={post.id} post={post} />
                )
            })}
        </div>
    )
}

export default AllPosts