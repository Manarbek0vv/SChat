import { doc, getDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { firestore, storage } from "../../main";
import { UserState } from "../store/reducers/userSlice";
import { SendChatType, UseAuthorType, UseChatType, UseMessageType } from "../components/types/chat";
import { getDownloadURL, ref } from "firebase/storage";

type fetchChatsProps = {
    myUser: UserState;
    chats: string[];
    setError: Dispatch<SetStateAction<string | null>>
}

export const fetchChats = async (props: fetchChatsProps) => {
    try {
        const responseChats: UseChatType[] = []

        const myAvatarUrl = props.myUser.avatar && await getDownloadURL(ref(storage, props.myUser.avatar))

        const me: UseAuthorType = {
            uid: props.myUser.uid,
            avatar: myAvatarUrl,
            username: props.myUser.username
        }

        for (let chatID of props.chats) {
            const responseChat = (await getDoc(doc(firestore, 'chats', chatID))).data() as SendChatType

            // ---------------------------------------------------------------
            //  Получение собеседника 

            const responseUser = await getDoc(doc(firestore, 'users', chatID.replace(props.myUser.uid, '')))
            const data = responseUser.data() as UserState

            const companionAvatarUrl = data.avatar && await getDownloadURL(ref(storage, data.avatar))

            const companion: UseAuthorType = {
                uid: data.uid,
                avatar: companionAvatarUrl,
                username: data.username
            }

            // ---------------------------------
            // Все юзеры чата

            const users: UseAuthorType[] = [ me, companion ]

            // ----------------------------
            // Определение авторов сообщений

            const newMessages: UseMessageType[] = []

            for (let message of responseChat.messages) {
                newMessages.push(
                    {
                        ...message,
                        author: message.authorUid === me.uid ? 
                        me :
                        companion
                    }
                )
            }

            responseChats.push(
                {
                    chatID: responseChat.chatID,
                    messages: newMessages,
                    users
                }
            )
        }

        

        return responseChats
    } catch (error: any) {
        props.setError(error.message)
    }
}