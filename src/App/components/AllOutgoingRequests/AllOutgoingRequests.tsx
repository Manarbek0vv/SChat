import { FC, useEffect, useState } from "react";
import classes from './AllOutgoingRequests.module.scss'
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import Loader from "../../UI/Loader/Loader";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { cancelRequest } from "../../store/thunk/cancelRequest";
import { getOutgoingRequests } from "../../secondaryFunctions/getOutgoingRequests";
import { useNavigate } from "react-router-dom";

const AllOutgoingRequests: FC = () => {
    const { user: myUser } = useAppSelector(value => value.user)
    const disaptch = useAppDispatch()
    const navigate = useNavigate()

    const [friends, setFriends] = useState<UserState[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        if (!myUser) return

        setLoading(true)
        getOutgoingRequests(myUser)
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
                <h1 className={classes.notfound}>No outgoing friend requests</h1>
            )}

            {!loading && friends.map((friend: UserState) => {
                return (
                    <div key={friend.uid} className={classes.friend}>
                        <div className={classes.first}>
                            <div className={classes.avatar}
                                onClick={() => navigate(`/${friend.uid}`)}>
                                {friend.avatar && friend.avatar.startsWith('http') ?
                                    <img src={friend.avatar} alt="" className={classes.inner} /> :
                                    <img src="/default.png" alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
                                <div className={`${classes['is-online']} ${friend.state !== 'online' && classes.offline}`} />
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
                                    disaptch(cancelRequest({ myUser: myUser as UserState, setError, user: friend }))
                                }}>
                                Cancel request
                            </button>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default AllOutgoingRequests