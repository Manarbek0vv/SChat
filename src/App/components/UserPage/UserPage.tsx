import { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import classes from './UserPage.module.scss'
import { UserState } from "../../store/reducers/userSlice";
import { getUserByUid } from "../../secondaryFunctions/getUserByUid";
import UserPageHeader from "../UserPageHeader/UserPageHeader";
import UserPageInfo from "../UsePageInfo/UserPageInfo";
import UserPosts from '../UserPosts/UserPosts'
import AllPosts from "../AllPosts/AllPosts";
import { fetchUserPosts } from "../../store/thunk/fetchUserPosts";
import FullScreenLoader from "../../UI/FullScreenLoader/FullScreenLoader";

type UserParams = {
    uid: string;
}

const UserPage: FC = () => {
    const { uid } = useParams<UserParams>()
    const [user, setUser] = useState<UserState | null>(null)
    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (uid) {
            setLoading(true)
            getUserByUid({ uid })
                .then((response) => {
                    setUser(response)
                    setLoading(false)
                })
        }
    }, [])


    if (loading) {
        return <FullScreenLoader />
    }

    return (
        <div className={classes.container}>
            {!loading && user && (
                <>
                    <UserPageHeader user={user} />
                    <UserPageInfo user={user} />
                    <UserPosts />
                    <AllPosts callback={() => fetchUserPosts(user)} />
                </>
            )}
        </div>
    )
}

export default UserPage