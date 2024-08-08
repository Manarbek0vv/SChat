import React, { FC, useEffect, useState } from "react";
import classes from './BlackList.module.scss';
import { RxMagnifyingGlass } from "react-icons/rx";
import { useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import { getBlackListUsers } from "../../secondaryFunctions/getBlackListUsers";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import BlackListMember from "./BlackListMember/BlackListMember";
import Loader from "../../UI/Loader/Loader";
import { useSearchedValue } from "../../secondaryFunctions/useSearchedValue";
import BlackListModal from "./BlackListModal/BlackListModal";

const BlackList: FC = () => {
    const { user: myUser } = useAppSelector(value => value.user)

    const [blackList, setBlackList] = useState<UserState[]>([])
    const [searchValue, setSearchValue] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [isModalVisible, setIsModalVisible] = useState(false)

    const filteredBlackList = useSearchedValue(blackList, searchValue)

    useEffect(() => {
        setLoading(true)
        getBlackListUsers(myUser as UserState)
            .then((response) => {
                setBlackList(response)
                setLoading(false)
            })
            .catch(() => {
                setLoading(false)
            })
    }, [myUser])

    return (
        <div className={classes['scroll-wrapper']}>
            <div className={classes.container}>
                {error && <ModalAlert setError={setError}>{error}</ModalAlert>}
                {isModalVisible && <BlackListModal setIsModalVisible={setIsModalVisible} />}

                <div className={classes.info}>
                    <div className={classes.head}>
                        <h1 className={classes.title}>
                            Black list <span>{myUser?.blackList.length}</span>
                        </h1>

                        <a className={classes.button}
                            onClick={() => setIsModalVisible(true)}>
                            Add to black list
                        </a>
                    </div>

                    <hr className={classes.hr} />

                    <label className={classes.label}>
                        <input type="text"
                            className={classes.input}
                            placeholder="Blacklist search"
                            value={searchValue}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
                        <div className={classes['glass-wrapper']}>
                            <RxMagnifyingGlass className={classes.glass} />
                        </div>
                    </label>
                </div>

                <hr className={classes.hr} />

                {loading && !error && (
                    <div className={classes.loader}>
                        <Loader styles={{ width: '50px', BsBorderWidth: '2px' }} />
                    </div>
                )}

                {!loading &&
                    !error &&
                    !!filteredBlackList.length &&
                    (
                        <div className={classes['user-list']}>
                            {filteredBlackList.map((user, index) => {
                                return (
                                    <React.Fragment key={user.uid}>
                                        {index !== 0 && <hr className={classes.hr} />}
                                        <BlackListMember user={user} />
                                    </React.Fragment>
                                )
                            })}
                        </div>
                    )}

                {!loading && !error && !filteredBlackList.length && (
                    <div className={classes.empty}>
                        The list is empty
                    </div>
                )}
            </div>
        </div>
    )
}

export default BlackList