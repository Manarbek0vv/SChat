import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";

const AuthRoutes: FC = () => {


    return (
        <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default AuthRoutes