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
import { useSearchedValue } from "../../../secondaryFunctions/useSearchedValue";
import { addToBlackList } from "../../../store/thunk/addToBlackList";
import ModalAlert from "../../../UI/ModalAlert/ModalAlert";

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

    const filteredFriends = useSearchedValue(friends, searchValue)

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
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setSearchValue(e.target.value)
                        }}
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
                        {!loading && !filteredFriends.length && (
                            <div className={classes.empty}>
                                No friends found
                            </div>
                        )}

                        {filteredFriends.map((user) => {
                            return (
                                <div key={user.uid} className={classes.user}>
                                    <div className={classes.main}>
                                        <div className={classes.avatar}
                                            onClick={() => {
                                                navigateToUserProfile(user.uid)
                                            }}>
                                            {user.avatar &&
                                                <img
                                                    src={user.avatar}
                                                    alt=""
                                                    className={classes.inner} />
                                            }
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