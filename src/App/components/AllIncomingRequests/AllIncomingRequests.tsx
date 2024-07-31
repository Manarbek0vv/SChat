import { FC, useEffect, useState } from "react";
import classes from './AllIncomingRequests.module.scss'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import Loader from "../../UI/Loader/Loader";
import { getIncomingRequests } from "../../secondaryFunctions/getIncomingRequests";
import { acceptRequest } from "../../store/thunk/acceptRequest";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { declineRequests } from "../../store/thunk/declineRequest";
import { useNavigate } from "react-router-dom";

const AllIncomingRequests: FC = () => {
    const { user: myUser } = useAppSelector(value => value.user)
    const disaptch = useAppDispatch()
    const navigate = useNavigate()

    const [friends, setFriends] = useState<UserState[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!myUser) return

        setLoading(true)
        getIncomingRequests(myUser)
            .then(data => {
                setFriends(data)
                setLoading(false)
            })
    }, [myUser])


    return (
        <div className={classes.container}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            {loading && <div className={classes.loader}><Loader styles={{ width: '50px', BsBorderWidth: '2px' }} /></div>}

            {(!loading && !friends.length) && (
                <h1 className={classes.notfound}>No incoming friend requests</h1>
            )}

            {!loading && friends.map((friend: UserState) => {
                return (
                    <div key={friend.uid} className={classes.friend}>
                        <div className={classes.first}>
                            <div className={classes.icon}
                                onClick={() => navigate(`/${friend.uid}`)}>
                                {friend.avatar && <img src={friend.avatar as string} className={classes.avatar} />}
                            </div>
                            <div className={classes.info}>
                                <h1 className={classes.username}
                                    onClick={() => navigate(`/${friend.uid}`)}>
                                    {friend.username}
                                </h1>
                                {
                                    friend.isEmailVisible && (
                                        <h2 className={classes.email}>{friend.email}</h2>
                                    )
                                }
                            </div>
                        </div>
                        <div className={classes.buttons}>
                            <button className={classes.button}
                                onClick={() => {
                                    disaptch(acceptRequest({ myUser: myUser as UserState, setError, user: friend }))
                                }}>
                                Accept request
                            </button>

                            <button className={classes.button}
                                onClick={() => {
                                    disaptch(declineRequests({ myUser: myUser as UserState, setError, user: friend }))
                                }}>
                                Decline request
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AllIncomingRequests