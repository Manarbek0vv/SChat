import { Dispatch, FC, SetStateAction, useState } from "react";
import classes from './Select.module.scss'
import { MdOutlineExpandMore } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

export type OptionType = {
    name: string;
    value: string;
}

type SelectProps = {
    defaultValue: number;
    options: OptionType[];
    setValue: Dispatch<SetStateAction<OptionType>>;
    style?: {};
}

const Select: FC<SelectProps> = ({ defaultValue, options, setValue, style }) => {
    const [currentOption, setCurrentOption] = useState(options[defaultValue])
    const [ isOptionsVisible, setIsOptionsVisible ] = useState(false)

    return (
        <div className={classes.container} style={style} onClick={() => setIsOptionsVisible(prev => !prev)}>
            {currentOption.name} <MdOutlineExpandMore className={classes.pin} />

            <div className={classes.options} style={isOptionsVisible ? {opacity: 1, visibility: "visible"} : {}}>
                {options.map((option: OptionType) => {
                    return (
                        <div key={option.value} className={currentOption.value === option.value ? classes['active__option'] : classes.option}
                            onClick={() => {
                                if (currentOption.value !== option.value) {
                                    setCurrentOption(option);
                                    setValue(option)
                                }
                            }}>
                            {option.name} <IoMdCheckmark className={classes.mark} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Select