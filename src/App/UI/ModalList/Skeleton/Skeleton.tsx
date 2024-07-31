import { FC } from "react";
import classes from './Skeleton.module.scss';

const Skeleton: FC = () => {

    return (
        <>
            {[1, 2, 3, 4, 5].map((n) => {
                return (
                    <div key={n} className={classes.user}>
                        <div className={classes.avatar} />

                        <div className={classes.main}>
                            <p className={classes.username} />

                            <p className={classes.info} />
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default Skeleton