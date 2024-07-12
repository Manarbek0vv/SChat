import { FC, useEffect } from "react";
import classes from './Main.module.scss'
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { MainRouteType, MainRoutes } from "../MainRoutes";
import { useAppSelector } from "../../hooks/redux";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { UserState } from "../../store/reducers/userSlice";

const Main: FC = () => {
    const { user } = useAppSelector(value => value.user)
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')

        const userRef = doc(firestore, 'users', user?.uid as UserState['uid'])
        updateDoc(userRef, { state: 'online', lastChanges: Date.now() })

        window.addEventListener("unload", () => {
            updateDoc(userRef, { state: 'offline', lastChanges: Date.now() })
        })
    }, [])


    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <Sidebar />
                <Routes>
                    {MainRoutes.map((route: MainRouteType) => {
                        return <Route key={route.path} path={route.path} Component={route.Component} />
                    })}
                </Routes>
            </div>
        </div>
    )
}

export default Main