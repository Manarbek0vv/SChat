import { FC, useMemo, useState } from "react";
import classes from './FriendList.module.scss'
import { Link, Route, Routes } from "react-router-dom";
import { RxMagnifyingGlass } from "react-icons/rx";
import AllFriends from "../AllFriends/AllFriends";
import { UserState } from "../../store/reducers/userSlice";
import { useFriends } from "../../secondaryFunctions/useFriends";

type LinkType = {
    path: string;
    title: string;
}

const Links: LinkType[] = [
    { path: '', title: 'All friends' },
    { path: 'online', title: 'Friends online' }
]

const FriendList: FC = () => {
    const [activeTab, setActiveTab] = useState(Links[0].path)
    const [ searchValue, setSearchValue ] = useState('')
    const [ friends, setFriends ] = useState<UserState[]>([])

    const searchedFriends = useFriends(friends, searchValue)

    return (
        <div className={classes.container}>
            <div className={classes.links}>
                {Links.map((link: LinkType) => {
                    return (
                        <Link key={link.path} to={link.path} className={activeTab === link.path ? classes['active__link'] : classes.link}
                            onClick={() => setActiveTab(link.path)}>
                            {link.title}
                        </Link>
                    )
                })}
            </div>
            <label className={classes.label}>
                <input type="text" className={classes.input} placeholder="Search for friends" value={searchValue} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)} />
                <div className={classes['glass__wrapper']}>
                    <RxMagnifyingGlass className={classes.glass} />
                </div>
            </label>
            <Routes>
                <Route path="" element={<AllFriends setFriends={setFriends} friends={searchedFriends} />} />
                <Route path="online" element={<h1>Hello online!</h1>} />
            </Routes>
        </div>
    )
}

export default FriendList