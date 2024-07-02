import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import classes from './AllFriends.module.scss'
import { useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import { getFriends } from "../../secondaryFunctions/getFriends";
import { LuMessageCircle } from "react-icons/lu";

type AllFriendsProps = {
    setFriends: Dispatch<SetStateAction<UserState[]>>;
    friends: UserState[];
}

const AllFriends: FC<AllFriendsProps> = ({ setFriends, friends }) => {
    const { user } = useAppSelector(value => value.user)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!user?.friends) return
        getFriends(user)
            .then((data: UserState[]) => setFriends(data))
    }, [])


    return (
        <div className={classes.container}>
            {!friends.length && (
                <h1 className={classes.notfound}>No friends found</h1>
            )}

            {friends.map((friend: UserState) => {
                return (
                    <div key={friend.uid} className={classes.friend}>
                        <div className={classes.first}>
                            <div className={classes.icon}><img src="" /></div>
                            <div className={classes.info}>
                                <h1 className={classes.username}>{friend.username}</h1>
                                <h2 className={classes.email}>{friend.email}</h2>
                            </div>
                        </div>
                        <div className={classes.buttons}>
                            <LuMessageCircle className={classes.message} />
                            <div className={classes.bats}>...</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AllFriends