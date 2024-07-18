import { FunctionComponent } from "react";
import Friends from "./Friends/Friends";
import Settings from "./Settings/Settings";
import MyPage from "./MyPage/MyPage";
import Home from "./Home/Home";
import UserPage from "./UserPage/UserPage";

export type MainRouteType = {
    path: string;
    Component: FunctionComponent;
}

export const MainRoutes: MainRouteType[] = [
    { path: 'mypage/*', Component: MyPage },
    { path: 'friends/*', Component: Friends},
    { path: 'settings/*', Component: Settings },
    { path: 'posts/*', Component: Home },
    { path: '/:uid', Component: UserPage },
]