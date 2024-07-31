import { FC, useState } from "react";
import classes from './Confidentiality.module.scss';
import Switch from "../../UI/Switch/Switch";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import { setClosedAccount } from "../../store/thunk/setClosedAccount";

const Confidentiality: FC = () => {
    const { user: myUser } = useAppSelector(value => value.user)
    const [ error, setError ] = useState<string | null>(null)

    const dispatch = useAppDispatch()
    
    const setClosedAccountHandler = () => {
        if (!myUser) {
            setError('Expectation...')
            return
        }
        dispatch(setClosedAccount({
            myUser, 
            setError, 
            value: !myUser.isClosedAccount
        }))
    }

    return (
        <div className={classes.container}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            <div className={classes.content}>
                <h1 className={classes.title}>Account confidentiality</h1>

                <div className={classes.inner}>
                    <div className={classes.header}>
                        <h3 className={classes.name}>Closed account</h3>

                        <Switch 
                        value={myUser?.isClosedAccount as boolean}
                        setValue={setClosedAccountHandler} />
                    </div>

                    <div className={classes.paragraphs}>
                        <p className={classes.paragraph}>
                            If you have a public account, your profile and posts will be visible to all SChat users.
                        </p>

                        <p className={classes.paragraph}>
                            If you have a private account, only your friends can
                            message you and see your posts, including photos and videos
                            on your pages, as well as your friends list.
                        </p>
                        <p className={classes['more-details']}>More details</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confidentiality