import { FC } from "react";
import classes from './Settings.module.scss'
import SettingsSidebar from "../SettingsSidebar/SettingsSidebar";
import { Route, Routes, useNavigate } from "react-router-dom";
import CustomAccount from "../CustomAccount/CustomAccount";
import Confidentiality from "../Confidentiality/Confidentiality";
import BlackList from "../BlackList/BlackList";
import SolidSelect, { OptionType, SolidSelectModeEnum } from "../../UI/SolidSelect/SolidSelect";

type LinkType = {
    path: string;
    title: string;
}

const Links: LinkType[] = [
    { path: '', title: 'Account' },
    { path: 'confidentiality', title: 'Confidentiality' },
    { path: 'black-list', title: 'Black list' }
]

const Settings: FC = () => {
    const navigate = useNavigate()

    return (
        <div className={classes.container}>
            <div className={classes['solid-wrapper']}>
                <SolidSelect
                    options={Links.map(link => ({ name: link.title, value: link.path }))}
                    defaultValue={0}
                    style={
                        {
                            width: '100%',
                            padding: '5px 5px 5px 15px',
                            color: 'rgb(222, 222, 222)',
                            textAlign: "center"
                        }
                    }
                    setValue={(option: OptionType) => {
                        navigate(option.value)
                    }}
                    optionVisibleHeight="105px"
                    mode={SolidSelectModeEnum.BOTTOM}
                />
            </div>
            <Routes>
                <Route path="" element={<CustomAccount />} />
                <Route path="confidentiality" element={<Confidentiality />} />
                <Route path="black-list" element={<BlackList />} />
            </Routes>
            <SettingsSidebar />
        </div>
    )
}

export default Settings