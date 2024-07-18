import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import { MainRoutes, MainRouteType } from "./MainRoutes";

const MainRoutesWrapper: FC= () => {
    return (
        <>
            <Sidebar />
            <Routes>
                {MainRoutes.map((route: MainRouteType) => {
                    return <Route key={route.path} path={route.path} Component={route.Component} />
                })}
            </Routes>
        </>
    )
}

export default MainRoutesWrapper