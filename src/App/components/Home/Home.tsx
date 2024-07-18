import { FC, useState } from "react";
import classes from './Home.module.scss'
import { Link, Route, Routes } from "react-router-dom";
import AllRecommendedPosts from "../AllRecommendedPosts/AllRecommendedPosts";
import AllLatestPosts from "../AllLatestPosts";
import AllFriendPosts from "../AllFriendPosts";
type PostFilterType = {
    path: string;
    value: string;
}

const POST_FILTER: PostFilterType[] = [
    { path: 'latest', value: 'Latest'},
    { path: '', value: 'Recommendations' },
    { path: 'friend-posts', value: 'Friends'}
]

const Home: FC = () => {
    const [filter, setFilter] = useState<PostFilterType>(POST_FILTER[1])

    return (
        <div className={classes.container}>
            <nav className={classes.nav}>
                {POST_FILTER.map(currentFilter => {
                    return <Link key={currentFilter.path}
                        className={`${classes.link} ${filter.path === currentFilter.path ? classes['active-link'] : ''}`} 
                        to={currentFilter.path}
                        onClick={() => {
                            if (filter.path === currentFilter.path) return
                            setFilter(currentFilter)
                        }
                        }>
                        {currentFilter.value}
                    </Link>
                })}
            </nav>

            <div className={classes.container}>
                {/* {!loading && myPosts.map(post => {
                    return (
                        <PostItem key={post.id} post={post} />
                    )
                })} */}

                <Routes>
                    <Route path="latest" element={<AllLatestPosts />} />
                    <Route path="" element={<AllRecommendedPosts />} />
                    <Route path="friend-posts" element={<AllFriendPosts />} />
                </Routes>
            </div>
        </div>
    )
}

export default Home