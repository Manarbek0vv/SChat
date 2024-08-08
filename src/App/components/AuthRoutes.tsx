import { FC, useEffect, useState } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Registration from "./Registration/Registration";
import Login from "./Login/Login";
import { useAppDispatch } from "../hooks/redux";
import { loginWithStorage } from "../store/thunk/loginWithStorage";
import FullScreenLoader from "../UI/FullScreenLoader/FullScreenLoader";
import { getUserByUid } from "../secondaryFunctions/getUserByUid";

const AuthRoutes: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fromStorage = localStorage.getItem('current-user')

        if (!fromStorage) return

        setLoading(true)
        getUserByUid({ uid: fromStorage })
            .then((user) => {
                if (user) {
                    dispatch(loginWithStorage({ uid: fromStorage, setLoading }))
                    navigate('/')
                } else {
                    localStorage.removeItem('current-user')
                    setLoading(false)
                }
            })

    }, [])

    return (
        <>
            {loading && <FullScreenLoader />}

            <Routes>
                <Route path="*" element={<Navigate to="/register" replace />} />
                <Route path="/register" element={<Registration />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        </>
    )
}

export default AuthRoutes