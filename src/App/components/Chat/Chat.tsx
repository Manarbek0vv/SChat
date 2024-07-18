import { FC } from "react";
import classes from './Chat.module.scss';
import { UseChatType } from "../types/chat";
import { useAppSelector } from "../../hooks/redux";
import { Link, useNavigate } from "react-router-dom";

type ChatProps = {
    chat: UseChatType;
}

const Chat: FC<ChatProps> = ({ chat }) => {
    const { user: myUser } = useAppSelector(value => value.user)

    const navigate = useNavigate()

    const companion = chat.users.filter(user => user.uid !== myUser?.uid)[0]

    const lastMessage = !!chat.messages.length && chat.messages.at(-1)
    const lastMessageDate = lastMessage && (new Date(lastMessage.createdAt))

    return (
        <Link to={chat.chatID} className={classes.container} onClick={() => navigate(`${chat.chatID}`)}>
            <div className={classes.first}>
                <div className={classes.avatar}>
                    {companion.avatar && <img src={companion.avatar} alt="" className={classes.inner} />}
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