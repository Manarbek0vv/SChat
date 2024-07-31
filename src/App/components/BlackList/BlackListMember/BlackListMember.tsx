import { FC, useState } from "react";
import classes from './BlackListMember.module.scss';
import { UserState } from "../../../store/reducers/userSlice";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { deleteFromBlackList } from "../../../store/thunk/deleteFromBlackList";
import ModalAlert from "../../../UI/ModalAlert/ModalAlert";

interface BlackListMemberProps {
    user: UserState;
}

const BlackListMember: FC<BlackListMemberProps> = ({
    user
}) => {
    const { user: myUser } = useAppSelector(value => value.user)

    const navigate = useNavigate()
    const dispatch = useAppDispatch()

    const [error, setError] = useState<string | null>(null)

    const navigateUserToProfile = () => {
        navigate(`/${user.uid}`)
    }

    const deleteFromBlackListHandler = () => {
        dispatch(deleteFromBlackList({
            myUser: myUser as UserState,
            setError,
            user
        }))
    }

    return (
        <div className={classes.user}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            <div className={classes.info}>
                <div className={classes.avatar}
                    onClick={navigateUserToProfile}>
                    {user.avatar && <img src={user.avatar} alt="" className={classes.inner} />}
                </div>

                <p className={classes.username}
                    onClick={navigateUserToProfile}>
                    {user.username}
                </p>
            </div>


            <a className={classes.delete}
            onClick={deleteFromBlackListHandler}>
                Remove from list
            </a>
        </div>
    )
}

export default BlackListMember