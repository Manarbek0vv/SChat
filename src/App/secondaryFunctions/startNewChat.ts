import { NavigateFunction } from "react-router-dom";
import { UserState } from "../store/reducers/userSlice"
import { SendChatType } from "../components/types/chat";
import { Dispatch, SetStateAction } from "react";
import { arrayUnion, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { firestore } from "../../main";

type StartNewChatProps = {
    myUser: UserState;
    user: UserState;
    navigate: NavigateFunction;
    setError: Dispatch<SetStateAction<string | null>>
}

export const startNewChat = async (props: StartNewChatProps) => {
    try {
        if (props.myUser.blackList.includes(props.user.uid)) {
            props.setError("Can't write. The user is on your blacklist")
            return
        }
        if (props.user.blackList.includes(props.myUser.uid)) {
            props.setError("Can't write. You are blacklisted by this user")
            return
        }

        const newChatID = [props.myUser.uid, props.user.uid].sort().join('')

        const isChatHave = await getDoc(doc(firestore, 'chats', newChatID))

        if (isChatHave.data()) {
            props.navigate(`/chats/${newChatID}`)
            return
        }

        const newChat: SendChatType = {
            users: [props.myUser.uid, props.user.uid],
            messages: [],
            chatID: newChatID
        }

        await setDoc(doc(firestore, 'chats', newChatID), newChat)

        await updateDoc(doc(firestore, 'users', props.myUser.uid), {
            chats: arrayUnion(newChatID)
        })
        await updateDoc(doc(firestore, 'users', props.user.uid), {
            chats: arrayUnion(newChatID)
        })

        props.navigate(`/chats/${newChatID}`)

    } catch (error: any) {
        props.setError(error.message)
    }
}