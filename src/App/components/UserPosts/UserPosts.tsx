import { FC } from "react";
import classes from './UserPosts.module.scss'

const UserPosts: FC = () => {

    return (
        <div className={classes.container}>
            <section className={classes.header}>
                <p className={classes.text}>All posts</p>
            </section>
        </div>
    )
}

export default UserPosts