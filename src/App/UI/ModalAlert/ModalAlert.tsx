import { Dispatch, FC, SetStateAction } from "react";
import classes from './ModalAlert.module.scss'
import { createPortal } from "react-dom";

type ModalAlertProps = {
    children: React.ReactChild | React.ReactNode,
    setError: Dispatch<SetStateAction<string | null>>
}

const ModalAlert: FC<ModalAlertProps> = ({ children, setError }) => {

    return (
        createPortal(
            <div className={classes.wrapper}>
                <div className={classes.container}>
                    <h1 className={classes.title}>Confirm the action on the SChat website</h1>
                    <p className={classes.children}>{children}</p>
                    <button className={classes.ok} onClick={() => setError(null)}>OK</button>
                </div>
            </div>,
            document.getElementById('modal') as HTMLDivElement
        )
    )
}

export default ModalAlert