import { FC, useContext } from "react";
import classes from './Chat.module.scss';
import { UseChatType } from "../types/chat";
import { useAppSelector } from "../../hooks/redux";
import { Link, useNavigate } from "react-router-dom";
import { CurrentChatVisibleContext } from "../Chats/Chats";

type ChatProps = {
    chat: UseChatType;
}

const Chat: FC<ChatProps> = ({ chat }) => {
    const { user: myUser } = useAppSelector(value => value.user)

    const Context = useContext(CurrentChatVisibleContext)

    const navigate = useNavigate()

    const companion = chat.users.filter(user => user.uid !== myUser?.uid)[0]

    const lastMessage = !!chat.messages.length && chat.messages.at(-1)
    const lastMessageDate = lastMessage && (new Date(lastMessage.createdAt))

    return (
        <Link to={chat.chatID}
            className={classes.container}
            onClick={() => {
                navigate(`${chat.chatID}`)
                if (window.innerWidth <= 750) {
                    Context?.setIsCurrentChatVisible(true)
                }
            }}
        >
            <div className={classes.first}>
                <div className={classes.avatar}>
                    {companion.avatar && companion.avatar.startsWith('http') ?
                        <img src={companion.avatar} alt="" className={classes.inner} /> :
                        <img src="/default.png" alt="" style={{ width: '100%', height: '100%' }} />}
                </div>

                <div className={classes.info}>
                    <h3 className={classes.username}>
                        {companion.username}
                    </h3>

                    {lastMessage && (
                        <p className={classes.message}>
                            {lastMessage.author.uid === myUser?.uid && (
                                'Вы: '
                            )}
                            {lastMessage.message}
                        </p>
                    )}
                </div>
            </div>

            <div className={classes.date}>
                {(lastMessageDate && (
                    `${(String(lastMessageDate.getDate())).padStart(2, '0')}.${(String(lastMessageDate.getMonth() + 1)).padStart(2, '0')}.${lastMessageDate.getFullYear()}`
                ))}
            </div>
        </Link>
    )
}

export default Chat