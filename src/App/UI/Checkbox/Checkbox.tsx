import { Dispatch, FC, SetStateAction } from "react";
import classes from './Checkbox.module.scss';
import { IoMdCheckmark } from "react-icons/io";

type CheckboxProps = {
    isChecked: boolean;
    setIsChecked: Dispatch<SetStateAction<boolean>>;
    style?: {};
}

const Checkbox: FC<CheckboxProps> = ({ style, isChecked, setIsChecked }) => {

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsChecked(e.target.checked)
    }

    return (
        <div className={isChecked ? classes.true : classes.false} style={style}>
            {isChecked && <IoMdCheckmark className={classes.mark} />}
            <input type="checkbox" className={classes.input} onChange={onChange} />
        </div>
    )
}
export default Checkbox