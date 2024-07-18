import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { SendMessageType, UseChatType  } from "../components/types/chat"
import { firestore } from "../../main";

type SendNewMessageProps = {
    chat: UseChatType;
    newSendMessage: SendMessageType;
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const sendNewMessage = async (props: SendNewMessageProps) => {
    try {
        await updateDoc(doc(firestore, 'chats', props.chat.chatID), {
            messages: arrayUnion(props.newSendMessage)
        })
    } catch (error: any) {
        props.setError(error.message)
    }
}