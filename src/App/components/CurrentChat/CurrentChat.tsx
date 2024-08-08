import { FC, useContext, useEffect, useRef, useState } from "react";
import classes from './CurrentChat.module.scss'
import { useNavigate, useParams } from "react-router-dom";
import { SendMessageType, UseAuthorType, UseChatType, UseMessageType } from "../types/chat";
import { fetchChatById } from "../../secondaryFunctions/fetchChatById";
import { useAppSelector } from "../../hooks/redux";
import { UserState } from "../../store/reducers/userSlice";
import { SlArrowLeft } from "react-icons/sl";
import { IoSend } from "react-icons/io5";
import { sendNewMessage } from "../../secondaryFunctions/sendNewMessage";
import ModalAlert from "../../UI/ModalAlert/ModalAlert";
import ChatLoading from "../ChatLoading/ChatLoading";
import { CurrentChatVisibleContext } from "../Chats/Chats";

type CurrentChatParams = {
    id: string;
}

type CurrentChatProps = {
    setChats: React.Dispatch<React.SetStateAction<UseChatType[]>>
}

const CurrentChat: FC<CurrentChatProps> = (props) => {
    const { id } = useParams<CurrentChatParams>()
    const { user: myUser } = useAppSelector(value => value.user)
    const [chat, setChat] = useState<UseChatType | null>(null)

    const Context = useContext(CurrentChatVisibleContext)

    const navigate = useNavigate()

    const messagesRef = useRef<HTMLDivElement | null>(null)

    const [newMessageValue, setNewMessageValue] = useState('')
    const [error, setError] = useState<string | null>(null)

    const companion = chat?.users.filter(user => user.uid !== myUser?.uid)[0]

    useEffect(() => {
        if (!id || !myUser) return

        fetchChatById({ id, myUser: myUser as UserState, setError, setChat })
    }, [])

    const onSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!myUser) return
        if (!companion) return
        if (!chat) return
        if (!newMessageValue.length) return
        if (myUser.blackList.includes(companion.uid)) {
            setError("Can't write. The user is on your blacklist")
            return
        }
        if (companion.blacklist.includes(myUser.uid)) {
            setError("Can't write. You are blacklisted by this user")
            return
        }

        const sendDate = Date.now()

        const newUseMessage: UseMessageType = {
            author: chat.users.find(user => user.uid !== companion?.uid) as UseAuthorType,
            createdAt: sendDate,
            message: newMessageValue
        }
        const newSendMessage: SendMessageType = {
            authorUid: myUser.uid,
            createdAt: sendDate,
            message: newMessageValue
        }

        setChat({
            ...chat, messages: [...chat.messages, newUseMessage]
        })
        sendNewMessage({ chat, newSendMessage, setError })
        setNewMessageValue('')
    }

    useEffect(() => {
        if (!messagesRef.current) return

        messagesRef.current.scrollTop = messagesRef.current.scrollHeight
        props.setChats(prev => {
            return prev.map(currentChat => {
                if (currentChat.chatID === chat?.chatID) return chat
                return currentChat
            })
        })
    }, [chat])

    console.log(chat?.messages.at(-1))

    return (
        <>
            {error && <ModalAlert setError={setError}>{error}</ModalAlert>}

            {!chat && <ChatLoading />}

            {chat && companion && (
                <div className={classes.container}>
                    <div className={classes.header}>
                        <SlArrowLeft className={classes.pin} 
                        onClick={() => {
                            navigate('/chats')
                            Context?.setIsCurrentChatVisible(false)
                        }} />

                        <p className={classes.username}>{companion.username}</p>

                        <div className={classes.avatar}>
                            {companion.avatar && companion.avatar.startsWith('http') ?
                                <img src={companion.avatar} alt="" className={classes.inner} /> :
                                <img src="/default.png" alt="" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />}
                            <div className={`${classes['is-online']} ${companion.state !== 'online' && classes.offline}`} />
                        </div>
                    </div>

                    <div ref={messagesRef} className={classes.messages}>
                        <div className={classes.wrapper}>
                            {chat.messages.map(message => {
                                return (
                                    <div key={message.createdAt} className={`${classes.message} 
                            ${message.author.uid === myUser?.uid ? classes.my : classes.other}`}>
                                        <p className={classes.content}>{message.message}</p>
                                        <p className={classes.createdAt}>
                                            {(String(new Date(message.createdAt).getHours())).padStart(2, '0')}
                                            :
                                            {(String(new Date(message.createdAt).getMinutes())).padStart(2, '0')}
                                        </p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <form className={classes.form} onSubmit={onSendMessage}>
                        <input type="text" className={classes.input} placeholder="Enter your message..."
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                setNewMessageValue(e.target.value)
                            }} value={newMessageValue} />
                        <button className={classes.button}><IoSend className={classes.send} /></button>
                    </form>
                </div>
            )}
        </>
    )
}

export default CurrentChat