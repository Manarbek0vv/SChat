import { FC, useState } from "react";
import classes from './FriendsSidebar.module.scss'
import { Link, useNavigate } from "react-router-dom";
import { IoCheckmark } from "react-icons/io5";
import SolidSelect, { SolidSelectModeEnum } from "../../UI/SolidSelect/SolidSelect";
import { OptionType } from "../../UI/Select/Select";

type LinkType = {
    path: string;
    title: string;
}

const Links: LinkType[] = [
    { path: '', title: 'My friends' },
    { path: 'friend-requests', title: 'Friend requests' }
]

const FriendsSidebar: FC = () => {
    const navigate = useNavigate()
    const [activeTab, setActiveTab] = useState(Links[0].path)

    return (
        <>
            <div className={classes.container}>
                {Links.map((link: LinkType) => {
                    return <Link key={link.path} to={link.path}
                        className={activeTab === link.path ? classes['active__link'] : classes.link}
                        onClick={() => setActiveTab(link.path)}>
                        {link.title}
                        {activeTab === link.path && <IoCheckmark className={classes.check} />}
                    </Link>
                })}
            </div>

            <div className={classes['select-wrapper']}>
                <SolidSelect
                    style={
                        {
                            width: '100%',
                            padding: '5px 5px 5px 10px',
                            color: 'rgb(222, 222, 222)',
                            textAlign: "center"
                        }
                    }
                    defaultValue={0}
                    options={[
                        { name: Links[0].title, value: Links[0].path },
                        { name: Links[1].title, value: Links[1].path }
                    ]} setValue={(option: OptionType) => {
                        setActiveTab(option.value)
                        navigate(option.value)
                    }}
                    optionVisibleHeight="70px"
                    mode={SolidSelectModeEnum.BOTTOM} />
            </div>
        </>
    )
}

export default FriendsSidebar