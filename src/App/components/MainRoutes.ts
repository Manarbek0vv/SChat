import { FunctionComponent } from "react";
import Friends from "./Friends/Friends";

export type MainRouteType = {
    path: string;
    Component: FunctionComponent;
}

export const MainRoutes: MainRouteType[] = [
    { path: 'friends/*', Component: Friends}
]