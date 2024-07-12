import { FC, useEffect, useState } from "react";
import classes from './Home.module.scss'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchRecomendedPosts } from "../../store/thunk/fetchRecomendedPosts";
import { fetchLatestPosts } from "../../store/thunk/fetchLatestPosts";
import PostItem from "../PostItem/PostItem";
import LoadingPosts from "../LoadingPosts/LoadingPosts";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { fetchFriendPosts } from "../../store/thunk/fetchFriendPosts";
type PostFilterType = {
    path: string;
    value: string;
    dispatch: any;
}

const POST_FILTER: PostFilterType[] = [
    { path: 'latest', value: 'Latest', dispatch: fetchLatestPosts },
    { path: '', value: 'Recomendations', dispatch: fetchRecomendedPosts },
    { path: 'friend-posts', value: 'Friends', dispatch: fetchFriendPosts }
]

const Home: FC = () => {
    const { user, posts: myPosts } = useAppSelector(value => value.user)
    const [loading, setLoding] = useState(false)
    const [filter, setFilter] = useState<PostFilterType>(POST_FILTER[1])

    const dispatch = useAppDispatch()


    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!user) return

        setLoding(true)
        dispatch(filter.dispatch(user))
            .then(() => setLoding(false))
    }, [user, filter])

    return (
        <div className={classes.container}>
            <nav className={classes.nav}>
                {POST_FILTER.map(currentFilter => {
                    return <div key={currentFilter.path} 
                    className={`${classes.link} ${filter.path === currentFilter.path ? classes['active-link'] : ''}`}
                        onClick={() => {
                            if (filter.path === currentFilter.path) return
                            setFilter(currentFilter)}
                        }>
                        {currentFilter.value}
                    </div>
                })}
            </nav>

            <div className={classes.container}>
                {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

                {!loading && !myPosts.length && 
                (
                    <div className={classes.notfound}>
                        There are no posts
                    </div>
                )}

                {loading && <LoadingPosts />}

                {!loading && myPosts.map(post => {
                    return (
                        <PostItem key={post.id} post={post} />
                    )
                })}
            </div>
        </div>
    )
}

export default Home