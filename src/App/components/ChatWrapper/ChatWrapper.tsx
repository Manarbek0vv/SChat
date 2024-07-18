import { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { UseChatType } from "../types/chat";
import classes from './ChatWrapper.module.scss';
import CurrentChat from "../CurrentChat/CurrentChat";
import { SlArrowLeft } from "react-icons/sl";

type ChatWrapperProps = {
    setChats: React.Dispatch<React.SetStateAction<UseChatType[]>>
}

const ChatWrapper: FC<ChatWrapperProps> = (props) => {
    const navigate = useNavigate()

    return (
        <Routes>
            <Route path="" element={(
                <div className={classes.notfound}>
                    <SlArrowLeft className={classes.pin} onClick={() => {
                        navigate('/')
                    }} />

                    There is no chat selected, select a chat from the list or write to someone.
                </div>
            )} />
            <Route path=":id" element={<CurrentChat setChats={props.setChats} />} />
        </Routes>
    )
}

export default ChatWrapper