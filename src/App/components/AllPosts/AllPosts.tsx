import { createContext, FC, useEffect, useMemo, useRef, useState } from "react";
import classes from './AllPosts.module.scss'
import PostItem from "../PostItem/PostItem";
import { useAppSelector } from "../../hooks/redux";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import LoadingPosts from "../LoadingPosts/LoadingPosts";
import { UsePostType } from "../types/post";
import CreateNewPost from "../CreateNewPost/CreateNewPost";
import { UserState } from "../../store/reducers/userSlice";
import { useInView } from "react-intersection-observer";
import Loader from "../../UI/Loader/Loader";

type AllPostsProps = {
    fetchPosts: (offset: any, setOffset: React.Dispatch<React.SetStateAction<any>>) => Promise<UsePostType[] | undefined>;
    getPostsCount: (setError: React.Dispatch<React.SetStateAction<string | null>>, myUser: UserState) => Promise<number | undefined>
    isCreatorOpen?: boolean;
    setIsCreatorOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    additionalPosts?: UsePostType[];
}

export type PostsContextType = {
    posts: UsePostType[];
    setPosts: React.Dispatch<React.SetStateAction<UsePostType[]>>;
}

export const PostsContext = createContext<PostsContextType | null>(null)


const AllPosts: FC<AllPostsProps> = (props) => {
    const { user } = useAppSelector(value => value.user)
    const [posts, setPosts] = useState<UsePostType[]>([])
    const [currentPostID, setCurrentPostID] = useState<string | null>(null)
    const [pageCount, setPageCount] = useState(1)
    const [totalPage, setTotalPage] = useState(0)
    const [offset, setOffset] = useState<any>(null)

    const [observerRef, inView] = useInView()

    const filteredSortedPosts = useMemo(() => {
        const filteredPostsByWhoCanSee = posts.filter(post => {
            if (post.whoCanSee === 'FRIENDS' &&
                !(user?.friends.includes(post.author.uid)) && user?.uid !== post.author.uid) {
                return false
            } return true
        })
        return filteredPostsByWhoCanSee
    }, [posts, user])

    const [loading, setLoding] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const containerRef = useRef<HTMLDivElement | null>(null)

    const changeCurrentPostID = (id: string) => {
        setCurrentPostID(prev => {
            if (prev === id) {
                return null
            }
            return id
        })
    }

    window.onclick = () => {
        if (currentPostID) {
            setCurrentPostID(null)
        }
    }

    const fetchPosts = () => {
        if (totalPage >= pageCount) return

        setLoding(true)
        props.fetchPosts(offset, setOffset)
            .then((posts: UsePostType[] | undefined) => {
                setLoding(false)

                if (!posts) return

                setPosts(prev => [...prev, ...posts])
                setTotalPage(totalPage + 1)
            })
    }

    useEffect(() => {
        props.getPostsCount(setError, user as UserState)
            .then((count) => {
                count && setPageCount(Math.ceil(count / 10))
            })
    }, [])

    useEffect(() => {
        if (inView) {
            fetchPosts()
        }
    }, [inView])

    useEffect(() => {
        if (props.additionalPosts)
            setPosts([...props.additionalPosts, ...posts])
    }, [props.additionalPosts])

    return (
        <PostsContext.Provider value={{
            posts, setPosts
        }}>
            {props.isCreatorOpen &&
                <CreateNewPost setIsCreatorOpen={props.setIsCreatorOpen as React.Dispatch<React.SetStateAction<boolean>>}
                    setPosts={setPosts} />}


            <div className={classes.container} ref={containerRef}>
                <div className={classes['posts-container']}>
                    {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

                    {!loading && !filteredSortedPosts.length && (
                        <div className={classes.notfound}>
                            There is no list of posts
                        </div>
                    )}

                    {
                        filteredSortedPosts.map(post => {
                            return (
                                <PostItem
                                    key={post.id}
                                    post={post}
                                    currentPostID={currentPostID}
                                    changeCurrentPostID={changeCurrentPostID} />
                            )
                        })}

                    <div ref={observerRef} style={{ width: '100%' }} />

                    {loading && totalPage === 0 && <LoadingPosts />}
                    {loading && totalPage !== 0 && (
                        <div className={classes.loader}>
                            <Loader styles={{ width: '50px', BsBorderWidth: '2px' }} />
                        </div>
                    )}
                </div>
            </div>
        </PostsContext.Provider>
    )
}

export default AllPosts