import { FC, useState } from "react";
import classes from './SolidSelect.module.scss'
import { MdOutlineExpandMore } from "react-icons/md";
import { IoMdCheckmark } from "react-icons/io";

export const enum SolidSelectModeEnum {
    TOP = 'TOP',
    BOTTOM = 'BOTTOM'
}

export type OptionType = {
    name: string;
    value: any
}

type SelectProps = {
    defaultValue: number;
    options: OptionType[];
    setValue: any;
    style?: {};
    optionVisibleHeight: string;
    mode?: SolidSelectModeEnum
}

const SolidSelect: FC<SelectProps> = ({ defaultValue, options, setValue, style, optionVisibleHeight, mode = SolidSelectModeEnum.BOTTOM }) => {
    const [currentOption, setCurrentOption] = useState(options[defaultValue])
    const [ isOptionsVisible, setIsOptionsVisible ] = useState(false)

    return (
        <div className={`${classes.container} ${classes[mode]} ${isOptionsVisible ? classes[`active-options-${mode}`] : ''}`} 
        style={style} onClick={() => setIsOptionsVisible(prev => !prev)}>
            {currentOption.name} <MdOutlineExpandMore className={classes.pin} />

            <div className={classes.options} 
            style={{height: isOptionsVisible ? optionVisibleHeight : '0px'}}>
                {options.map((option: OptionType) => {
                    return (
                        <div key={option.name} className={currentOption.value === option.value ? classes['active__option'] : classes.option}
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

export default SolidSelect