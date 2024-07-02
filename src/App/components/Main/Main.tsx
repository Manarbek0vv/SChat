import { FC, useEffect } from "react";
import classes from './Main.module.scss'
import { Route, Routes, useNavigate } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { MainRouteType, MainRoutes } from "../MainRoutes";

const Main: FC = () => {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/')
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