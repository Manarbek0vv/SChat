import { FC } from "react";
import classes from './FullScreenLoader.module.scss'
import Loader from "../Loader/Loader";
import { createPortal } from "react-dom";

const FullScreenLoader: FC = () => {

    return createPortal(
        <div className={classes.container}>
            <Loader styles={{ width: '80px', borderWidth: '10px' }} />
        </div>,
        document.getElementById('modal') as HTMLDivElement
    )
}

export default FullScreenLoader