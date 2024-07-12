import { FC } from "react";
import classes from './Loader.module.scss'

type LoaderProps = {
    styles: {}
}

const Loader: FC<LoaderProps> = ({ styles }) => {

    return (
        <div className={classes.loader} style={styles}></div>
    )
}

export default Loader