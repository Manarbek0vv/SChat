import { FC, useEffect, useState } from "react";
import classes from './Chats.module.scss';
import { useAppSelector } from "../../hooks/redux";
import { UseChatType } from "../types/chat";
import { fetchChats } from "../../secondaryFunctions/fetchChats";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import Chat from "../Chat/Chat";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import ChatWrapper from "../ChatWrapper/ChatWrapper";

const Chats: FC = () => {
    const { user: myUser } = useAppSelector(value => value.user)

    const [searchValue, setSearchValue] = useState('')

    const [chats, setChats] = useState<UseChatType[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (!myUser) return

        setLoading(true)
        fetchChats(
            {
                myUser: myUser,
                chats: myUser.chats,
                setError
            }
        )
            .then((response) => {
                if (response) {
                    setChats(response)
                }
                setLoading(false)
            })
    }, [myUser])

    return (
        <div className={classes.container}>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            <nav className={classes.chats}>
                <div className={classes['chats-header']}>
                    Chats
                </div>
                <form className={classes.form}>
                    <label className={classes.label}>
                        <HiOutlineMagnifyingGlass className={classes.pin} />
                        <input type="text" className={classes.input} placeholder="Search..."
                            value={searchValue} onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setSearchValue(e.target.value)
                            }} />
                    </label>
                </form>
                <div className={classes['chat-list']}>
                    {loading && (
                        [1, 2, 3, 4, 5].map((n) => {
                            return (
                                <div key={n} className={classes.loader}>
                                    <div className={classes.first}>
                                        <div className={classes.avatar}></div>
                                        <div className={classes.info}>
                                            <h3 className={classes.username}></h3>
                                            <p className={classes.message}></p>
                                        </div>
                                    </div>
                                    <div className={classes.date}></div>
                                </div>
                            )
                        })
                    )}

                    {!loading && chats.map(chat => {
                        return <Chat key={chat.chatID} chat={chat} />
                    })}
                </div>
            </nav>

            <ChatWrapper setChats={setChats} />
        </div>
    )
}

export default Chats