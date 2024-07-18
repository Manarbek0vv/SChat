import { FC } from "react";
import classes from './ChatLoading.module.scss';

const ChatLoading: FC = () => {

    return (
        <div className={classes.container}>
            <div className={classes.header}></div>

            <div className={classes.messages}>
                <div className={classes.message}></div>
                <div className={classes.message}></div>
                <div className={classes.message}></div>
                <div className={classes.message}></div>
                <div className={classes.message}></div>
                <div className={classes.message}></div>
                <div className={classes.message}></div>
                <div className={classes.message}></div>
                <div className={classes.message}></div>
                <div className={classes.message}></div>
            </div>

            <div className={classes.footer}></div>
        </div>
    )
}

export default ChatLoading