import { Dispatch, FC, SetStateAction } from "react";
import classes from './MyPosts.module.scss'

type MyPostsProps = {
    setIsCreatorOpen: Dispatch<SetStateAction<boolean>>
}

const ControlCreate: FC<MyPostsProps> = ({ setIsCreatorOpen }) => {

    return (
        <div className={classes.container}>
            <section className={classes.header}>
                <p className={classes.text}>All posts</p>
                <button className={classes.button} onClick={() => 
                    setIsCreatorOpen(prev => !prev)
                }>Create post</button>
            </section>
        </div>
    )
}

export default ControlCreate