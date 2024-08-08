import { FC, useEffect } from "react";
import classes from './Main.module.scss'
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { UserState } from "../../store/reducers/userSlice";
import Chats from "../Chats/Chats";
import MainRoutesWrapper from "../MainRoutesWrapper";
import { listenMyUser } from "../../store/thunk/listenMyUser";

const Main: FC = () => {
    const { user } = useAppSelector(value => value.user)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()



    useEffect(() => {
        navigate('posts')

        const userRef = doc(firestore, 'users', user?.uid as UserState['uid'])
        updateDoc(userRef, { state: 'online', lastChanges: Date.now() })

        onSnapshot(doc(firestore, 'users', user?.uid as UserState['uid']), (response) => {
            dispatch(listenMyUser({ response: response.data() as UserState }))
        })

        window.addEventListener("beforeunload", () => {
            updateDoc(userRef, { state: 'offline', lastChanges: Date.now() })
        })

        window.addEventListener("visibilitychange", () => {
            if (document.hidden) {
                updateDoc(userRef, { state: 'offline', lastChanges: Date.now() })
            } else {
                updateDoc(userRef, { state: 'online', lastChanges: Date.now() })
            }
        })

        return () => {
            updateDoc(userRef, { state: 'offline', lastChanges: Date.now() })
        }
    }, [])


    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <Routes>
                    <Route path="/*" element={<MainRoutesWrapper />} />
                    <Route path="chats/*" element={<Chats />} />
                </Routes>
            </div>
        </div>
    )
}

export default Main