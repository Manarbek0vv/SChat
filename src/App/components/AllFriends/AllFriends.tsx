import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import classes from './AllFriends.module.scss'
import { useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import { getFriends } from "../../secondaryFunctions/getFriends";
import Loader from "../../UI/Loader/Loader";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import Friend from "../Friend/Friend";

type AllFriendsProps = {
    setFriends: Dispatch<SetStateAction<UserState[]>>;
    friends: UserState[];
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

const AllFriends: FC<AllFriendsProps> = ({ setFriends, friends }) => {
    const { user: myUser } = useAppSelector(value => value.user)

    const [ error, setError ] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!myUser?.friends) return

        setLoading(true)
        getFriends(myUser)
            .then((data: UserState[]) => {
                setFriends(data)
                setLoading(false)
            })
    }, [myUser])

    return (
        <div className={classes.container}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            {loading && <div className={classes.loader}><Loader styles={{ width: '50px', BsBorderWidth: '2px' }} /></div>}

            {(!loading && !friends.length) && (
                <h1 className={classes.notfound}>No friends found</h1>
            )}

            {!loading && friends.map((friend: UserState) => {
                return <Friend key={friend.uid} friend={friend} setError={setError} />
            })}
        </div>
    )
}

export default AllFriends