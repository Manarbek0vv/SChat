import { FC, useEffect, useState } from "react";
import classes from './BlackListModal.module.scss';
import { IoCloseSharp } from "react-icons/io5";
import { RxMagnifyingGlass } from "react-icons/rx";
import { createPortal } from "react-dom";
import { UserState } from "../../../store/reducers/userSlice";
import { getFriends } from "../../../secondaryFunctions/getFriends";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import Loader from "../../../UI/Loader/Loader";
import { useNavigate } from "react-router-dom";
import { addToBlackList } from "../../../store/thunk/addToBlackList";
import ModalAlert from "../../../UI/ModalAlert/ModalAlert";
import { useDelay } from "../../../hooks/useDelay";
import { getUserByUid } from "../../../secondaryFunctions/getUserByUid";

interface BlackListModalProps {
    setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>
}

const BlackListModal: FC<BlackListModalProps> = ({
    setIsModalVisible
}) => {
    const { user: myUser } = useAppSelector(value => value.user)

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const [error, setError] = useState<string | null>(null)

    const [friends, setFriends] = useState<UserState[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)

    const [currentUser, setCurrentUser] = useState<UserState[]>([])
    const { isAllowed, onStateChange } = useDelay({ seconds: 2000 })

    const fetchUserByUid = () => {
        const isUserUid = searchValue.split('/').at(-1)
        if (isUserUid?.length === 28) {
            setLoading(true)
            getUserByUid({ uid: isUserUid })
                .then((responseUser) => {
                    setCurrentUser([responseUser])
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        }
    }

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        onStateChange()
    }

    useEffect(() => {
        if (!!searchValue.length && isAllowed) {
            fetchUserByUid()
        } else {
            setCurrentUser([])
        }
    }, [isAllowed])

    useEffect(() => {
        setLoading(true)

        getFriends(myUser as UserState)
            .then((response) => {
                setFriends(response)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [myUser])

    const addToBlackListHandler = (user: UserState) => {
        dispatch(addToBlackList({
            myUser: myUser as UserState,
            setError,
            user
        }))
    }

    const navigateToUserProfile = (uid: string) => {
        navigate(`/${uid}`)
    }

    return createPortal(
        <div className={classes.wrapper}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            <div className={classes.container}>
                <div className={classes.head}>
                    <h1 className={classes.title}>
                        Add to blacklist
                    </h1>

                    <IoCloseSharp className={classes.close}
                        onClick={() => setIsModalVisible(false)} />
                </div>

                <hr className={classes.hr} />

                <label className={classes.label}>
                    <RxMagnifyingGlass className={classes.glass} />

                    <input type="text" className={classes.input}
                        value={searchValue}
                        onChange={onChangeHandler}
                        placeholder="Enter a link to the user's page" />

                    {!!searchValue && <IoCloseSharp className={classes.reset}
                        onClick={() => setSearchValue('')} />}
                </label>

                <hr className={classes.hr} />

                {loading && (
                    <div className={classes.loader}>
                        <Loader styles={{ width: '50px', BsBorderWidth: '2px' }} />
                    </div>
                )}

                {!loading && (
                    <div className={classes.users}>
                        {!loading && !!searchValue.length && !currentUser.length && (
                            <div className={classes.empty}>
                                No user found
                            </div>
                        )}

                        {!loading && !friends.length && !searchValue.length && (
                            <div className={classes.empty}>
                                No friends found
                            </div>
                        )}

                        {(!!searchValue.length ?
                            currentUser :
                            friends
                        ).map((user) => {
                            return (
                                <div key={user.uid} className={classes.user}>
                                    <div className={classes.main}>
                                        <div className={classes.avatar}
                                            onClick={() => {
                                                navigateToUserProfile(user.uid)
                                            }}>
                                            {user.avatar && user.avatar.startsWith('http') ?
                                                <img src={user.avatar} alt="" className={classes.inner} /> :
                                                <img src="/default.png" alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
                                            <div className={`${classes['is-online']} ${user?.state !== 'online' && classes.offline}`} />
                                        </div>

                                        <div className={classes.info}>
                                            <p className={classes.username}
                                                onClick={() => {
                                                    navigateToUserProfile(user.uid)
                                                }}>
                                                {user.username}
                                            </p>

                                            <p className={classes.email}>
                                                {user.isEmailVisible && user.email}
                                            </p>
                                        </div>
                                    </div>

                                    <button className={classes.block}
                                        onClick={() => {
                                            addToBlackListHandler(user)
                                        }}>
                                        Block
                                    </button>
                                </div>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>,
        document.getElementById('modal') as HTMLDivElement
    )
}

export default BlackListModal