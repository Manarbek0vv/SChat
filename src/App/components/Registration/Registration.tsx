import { FC, useState } from 'react'
import classes from './Registration.module.scss'
import { FaRegUser } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { useUsername } from '../../hooks/useUsername';
import ModalAlert from '../../UI/ModalAlert/ModalAlert';
import { useEmail } from '../../hooks/useEmail';
import { usePassword } from '../../hooks/usePassword';
import { useAppDispatch } from '../../hooks/redux';
import { createUser } from '../../store/thunk/createUser';

const Registration: FC = () => {
    const [ error, setError ] = useState<string | null>(null)

    const dispatch = useAppDispatch()

    const { username, onUsernameChange } = useUsername('', setError)
    const { email, onEmailChange } = useEmail('', setError)
    const { password, onPasswordChange } = usePassword('', setError)

    const registration = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(createUser({username, email, password, setError}))
    }

    return (
        <div className={classes.wrapper}>
            <form className={classes.container} onSubmit={registration}>
                <h1 className={classes.title}>Register</h1>
                <div className={classes.labels}>
                    <label className={classes.label}>
                        <FaRegUser className={classes.icon} />
                        <input type="text" value={username} onChange={onUsernameChange} className={classes.input} placeholder='Enter username' />
                    </label>
                    <label className={classes.label}>
                        <MdOutlineAlternateEmail className={classes.icon} />
                        <input type="text" value={email} onChange={onEmailChange} className={classes.input} placeholder='Enter email' />
                    </label>
                    <label className={classes.label}>
                        <GoKey className={classes.icon} />
                        <input type="password" value={password} onChange={onPasswordChange} className={classes.input} placeholder='Enter password' />
                    </label>
                </div>

                <button className={classes.button}>Register</button>
                <Link to={'/login'} className={classes.text}>Have an account?</Link>
            </form>

            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}
        </div>
    )
}

export default Registration