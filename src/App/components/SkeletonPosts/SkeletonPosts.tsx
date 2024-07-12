import { FC } from "react";
import classes from './SkeletonPosts.module.scss'

const SkeletonPosts: FC = () => {

    return (
        <div className={classes.container}>
            <div className={classes.post}>
                <div className={classes['post-info']}>
                    <div className={classes.first}>
                        <div className={classes.avatar}></div>

                        <div className={classes['user-info']}>
                            <p className={classes.username}></p>
                            <p className={classes.createdAt}></p>
                        </div>
                    </div>

                </div>

                <p className={classes.description}></p>
            </div>
        </div>
    )
}

export default SkeletonPosts