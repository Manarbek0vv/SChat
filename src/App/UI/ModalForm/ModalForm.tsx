import { FC } from "react";
import classes from './ModalForm.module.scss';
import { createPortal } from "react-dom";
import { IoClose } from "react-icons/io5";

interface ModalFormProps {
    children: React.ReactNode | React.ReactChild;
    title: string;
    buttonTitle: string;
    setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (e: React.MouseEvent<HTMLFormElement>) => void;
}

const ModalForm: FC<ModalFormProps> = ({
    children,
    title,
    buttonTitle,
    setIsVisible,
    onSubmit
}) => {

    return createPortal(
        <div className={classes.wrapper}>
            <form className={classes.container}
            onSubmit={onSubmit}>
                <IoClose
                    className={classes.close}
                    onClick={() => setIsVisible(false)} />
                <h1 className={classes.title}>{title}</h1>
                <div className={classes.labels}>
                    {children}
                </div>

                <button className={classes.button}>{buttonTitle}</button>
            </form>
        </div>
        ,
        document.getElementById('modal') as HTMLDivElement
    )
}

export default ModalForm