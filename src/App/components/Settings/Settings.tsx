import { FC } from "react";
import classes from './Settings.module.scss'
import MyPageSidebar from "../SettingsSidebar/SettingsSidebar";

const Settings: FC = () => {

    return (
        <div className={classes.container}>
            <div></div>
            <MyPageSidebar />
        </div>
    )
}

export default Settings