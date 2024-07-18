import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import classes from './FriendOnline.module.scss'
import { useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import { LuMessageCircle } from "react-icons/lu";
import { getFriends } from "../../secondaryFunctions/getFriends";
import Loader from "../../UI/Loader/Loader";

type FriendsOnlineType = {
    friends: UserState[];
    setFriends: Dispatch<SetStateAction<UserState[]>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const FriendsOnline: FC<FriendsOnlineType> = ({ friends, setFriends }) => {
    const { user } = useAppSelector(value => value.user)

    const [ loading, setLoading ] = useState(false)

    useEffect(() => {
        if (!user?.friends) return

        setLoading(true)
        getFriends(user)
            .then((data: UserState[]) => {
                setFriends(data.filter(user => (user.state as string) === 'online'))
                setLoading(false)
            })
    }, [])

    return (
        <div className={classes.container}>
            {loading && <div className={classes.loader}><Loader styles={{width: '50px', BsBorderWidth: '2px'}} /></div>}

            {!loading && !friends.length && (
                <h1 className={classes.notfound}>No friends found</h1>
            )}

            {!loading && friends.map((friend: UserState) => {
                return (
                    <div key={friend.uid} className={classes.friend}>
                        <div className={classes.first}>
                            <div className={classes.icon}><img src={friend.avatar as string} className={classes.avatar} /></div>
                            <div className={classes.info}>
                                <h1 className={classes.username}>{friend.username}</h1>
                                <h2 className={classes.email}>{friend.email}</h2>
                            </div>
                        </div>
                        <div className={classes.buttons}>
                            <LuMessageCircle className={classes.message} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default FriendsOnline