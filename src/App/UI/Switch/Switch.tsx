import { FC, useState } from "react";
import classes from './Switch.module.scss';

interface SwitchProps {
    style?: React.CSSProperties;
    value: boolean;
    setValue: Function;
}

const Switch: FC<SwitchProps> = (props) => {

    return (
        <div 
        className={`${classes.container} ${props.value ? classes['container-on'] : classes['container-off']}`} 
        style={props.style}
        onClick={() => props.setValue()}>
            <div className={classes.circle} />
        </div>
    )
}

export default Switch