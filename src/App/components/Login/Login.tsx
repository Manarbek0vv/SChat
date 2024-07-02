import { FC, useState } from 'react'
import classes from './Login.module.scss'
import { MdOutlineAlternateEmail } from "react-icons/md";
import { GoKey } from "react-icons/go";
import { Link, useNavigate } from 'react-router-dom';
import { useEmail } from '../../hooks/useEmail';
import { usePassword } from '../../hooks/usePassword';
import ModalAlert from '../../UI/ModalAlert/ModalAlert';
import { useAppDispatch } from '../../hooks/redux';
import { loginUser } from '../../store/thunk/loginUser';

const Login: FC = () => {
    const dispatch = useAppDispatch()

    const [ error, setError ] = useState<string | null>(null)

    const { email, onEmailChange } = useEmail('', setError)
    const { password, onPasswordChange } = usePassword('', setError)

    const login = (e: React.MouseEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(loginUser({ email, password, setError }))
    }

    return (
        <div className={classes.wrapper}>
        <form className={classes.container} onSubmit={login}>
            <h1 className={classes.title}>Login</h1>
            <div className={classes.labels}>
                <label className={classes.label}>
                    <MdOutlineAlternateEmail className={classes.icon} />
                    <input type="text" value={email} onChange={onEmailChange} className={classes.input} placeholder='Enter email' />
                </label>
                <label className={classes.label}>
                    <GoKey className={classes.icon} />
                    <input type="password" value={password} onChange={onPasswordChange} className={classes.input} placeholder='Enter password' />
                </label>
            </div>

            <button className={classes.button}>Login</button>
            <Link to={'/register'} className={classes.text}>Haven't an account</Link>
        </form>

        {error && <ModalAlert setError={setError}>{error}</ModalAlert>}
    </div>
    )
}

export default Login