import { createContext, FC, useEffect, useMemo, useState } from "react";
import classes from './Chats.module.scss';
import { useAppSelector } from "../../hooks/redux";
import { UseChatType } from "../types/chat";
import { fetchChats } from "../../secondaryFunctions/fetchChats";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import Chat from "../Chat/Chat";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import ChatWrapper from "../ChatWrapper/ChatWrapper";
import { SlArrowLeft } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

interface CurrentChatVisibleContextType {
    isCurrentChatVisible: boolean
    setIsCurrentChatVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export const CurrentChatVisibleContext = createContext<CurrentChatVisibleContextType | null>(null)

const Chats: FC = () => {
    const { user: myUser } = useAppSelector(value => value.user)

    const navigate = useNavigate()

    const [searchValue, setSearchValue] = useState('')

    const [chats, setChats] = useState<UseChatType[]>([])
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const [isCurrentChatVisible, setIsCurrentChatVisible] = useState(false)

    const filteredChats = useMemo(() => {
        if (!searchValue.length) return chats
        return chats.filter((chat) => {
            const companion = chat.users.filter(user => user.uid !== myUser?.uid)[0]
            return companion.username.toLowerCase().includes(searchValue.toLowerCase())
        })
    }, [searchValue, chats])

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

    console.log(window.innerWidth)

    return (
        <CurrentChatVisibleContext.Provider
            value={{
                isCurrentChatVisible,
                setIsCurrentChatVisible
            }}>
            <div className={classes.container}>
                {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

                {/* <div className={classes.burger}>
                    <CiMenuBurger className={classes.burger} /> */}


                <nav
                    className={classes.chats}
                    style={{ display: window.innerWidth <= 750 ? !isCurrentChatVisible ? "flex" : "none" : "flex" }}
                >
                    <div className={classes['chats-header']}>
                        Chats

                        {window.innerWidth <= 750 &&
                            <SlArrowLeft className={classes.close}
                            onClick={() => {
                                navigate('/posts')
                            }} />}
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

                        {!loading && filteredChats.map(chat => {
                            return <Chat key={chat.chatID} chat={chat} />
                        })}
                    </div>
                </nav>

                {/* </div> */}

                {
                    window.innerWidth <= 750 ?
                        (isCurrentChatVisible ? <ChatWrapper setChats={setChats} /> : "")
                        : <ChatWrapper setChats={setChats} />
                }
            </div>
        </CurrentChatVisibleContext.Provider>
    )
}

export default Chats