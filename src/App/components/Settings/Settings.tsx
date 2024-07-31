import { FC } from "react";
import classes from './Settings.module.scss'
import SettingsSidebar from "../SettingsSidebar/SettingsSidebar";
import { Route, Routes } from "react-router-dom";
import CustomAccount from "../CustomAccount/CustomAccount";
import Confidentiality from "../Confidentiality/Confidentiality";
import BlackList from "../BlackList/BlackList";

const Settings: FC = () => {

    return (
        <div className={classes.container}>
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