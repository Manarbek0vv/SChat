import { FC, useState } from "react";
import classes from './SettingsSidebar.module.scss'
import { Link } from "react-router-dom";

type LinkType = {
    path: string;
    title: string;
}

const Links: LinkType[] = [
    { path: '', title: 'Account' },
    { path: 'confidentiality', title: 'Confidentiality' },
    { path: 'black-list', title: 'Black list' }
]

const SettingsSidebar: FC = () => {
    const [ activeTab, setActiveTab ] = useState(Links[0].path)

    return (
        <div className={classes.container}>
            {Links.map((link: LinkType) => {
                return (
                    <Link key={link.path} className={activeTab === link.path ? classes['active__link'] : classes.link} to={link.path} 
                    onClick={() => setActiveTab(link.path)}>
                        {link.title}
                    </Link>
                )
            })}
        </div>
    )
}

export default SettingsSidebar