import { createContext, FC, useEffect, useMemo, useState } from "react";
import classes from './AllPosts.module.scss'
import PostItem from "../PostItem/PostItem";
import { useAppSelector } from "../../hooks/redux";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import LoadingPosts from "../LoadingPosts/LoadingPosts";
import { UsePostType } from "../types/post";
import CreateNewPost from "../CreateNewPost/CreateNewPost";

type AllPostsProps = {
    callback: any;
    isCreatorOpen?: boolean;
    setIsCreatorOpen?: React.Dispatch<React.SetStateAction<boolean>>;
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

    const filteredSortedPosts = useMemo(() => {
        const filteredPosts = posts.filter(post => {
            if (post.whoCanSee === 'FRIENDS' &&
                !(user?.friends.includes(post.author.uid))) {
                return false
            } return true
        })
        return filteredPosts.sort((a, b) => b.createdAt - a.createdAt)
    }, [posts])

    const [loading, setLoding] = useState(false)


    const [error, setError] = useState<string | null>(null)

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
            console.log('window')
            setCurrentPostID(null)
        }
    }

    useEffect(() => {
        if (!user) return

        setLoding(true)
        props.callback()
            .then((posts: UsePostType[]) => {
                setLoding(false)
                if (posts) setPosts(posts)
            })
    }, [user])



    return (
        <PostsContext.Provider value={{
            posts, setPosts
        }}>
            {props.isCreatorOpen && <CreateNewPost setIsCreatorOpen={props.setIsCreatorOpen as React.Dispatch<React.SetStateAction<boolean>>} />}


            <div className={classes.container}>
                {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

                {loading && <LoadingPosts />}

                {!loading && !filteredSortedPosts.length && (
                    <div className={classes.notfound}>
                        There is no list of posts
                    </div>
                )}

                {!loading &&
                    filteredSortedPosts.map(post => {
                        return (
                            <PostItem 
                            key={post.id} 
                            post={post} 
                            currentPostID={currentPostID} 
                            changeCurrentPostID={changeCurrentPostID} />
                        )
                    })}
            </div>
        </PostsContext.Provider>
    )
}

export default AllPosts