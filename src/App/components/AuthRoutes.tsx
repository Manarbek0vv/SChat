import { FC, useEffect } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import { useAppDispatch } from "../hooks/redux";
import { loginWithStorage } from "../store/thunk/loginWithStorage";

const AuthRoutes: FC = () => {
    const dispatch = useAppDispatch()


    useEffect(() => {
        const fromStorage = localStorage.getItem('current-user')

        if (!fromStorage) return
        dispatch(loginWithStorage(fromStorage))
    }, [])

    return (
        <Routes>
            <Route path="/" element={<Navigate to="/register" replace />} />
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default AuthRoutes