import { FC } from "react";
import classes from './LoadingPosts.module.scss'

const LoadingPosts: FC = () => {

    return (
        <>
            {[1, 2, 3].map((n) => {
                return (
                    <div key={n} className={classes.post}>
                        <div className={classes['post-info']}>
                            <div className={classes.first}>
                                <div className={classes.avatar}></div>

                                <div className={classes['user-info']}>
                                    <p className={classes.username}></p>
                                    <p className={classes.createdAt}></p>
                                </div>
                            </div>

                        </div>

                        <div className={classes.description}>
                            <p className={classes.firstp}></p>
                            <p className={classes.secondp}></p>
                            <p className={classes.thirdp}></p>
                        </div>

                        <div className={classes.footer}>
                            <div className={classes.like}></div>

                            <div className={classes.dislikes}></div>

                            <div className={classes.comments}></div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default LoadingPosts