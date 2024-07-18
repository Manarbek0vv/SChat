import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore, storage } from "../../main";
import { SendChatType, UseAuthorType, UseChatType, UseMessageType } from "../components/types/chat";
import { UserState } from "../store/reducers/userSlice";
import { getDownloadURL, ref } from "firebase/storage";

type FetchChatByIdProps = {
    id: string;
    myUser: UserState;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    setChat: React.Dispatch<React.SetStateAction<UseChatType | null>>
};

export const fetchChatById = async (props: FetchChatByIdProps) => {
    return new Promise(() => {
        try {
            onSnapshot(doc(firestore, 'chats', props.id), async (snapshot) => {
                try {
                    const responseChat = snapshot.data() as SendChatType;

                    const myAvatarUrl = props.myUser.avatar && await getDownloadURL(ref(storage, props.myUser.avatar))

                    const me: UseAuthorType = {
                        uid: props.myUser.uid,
                        avatar: myAvatarUrl,
                        username: props.myUser.username
                    };

                    const companionUid = props.id.replace(props.myUser.uid, '');
                    const responseUser = await getDoc(doc(firestore, 'users', companionUid));
                    const data = responseUser.data() as UserState;

                    const companionAvatarUrl = data.avatar && await getDownloadURL(ref(storage, data.avatar))

                    const companion: UseAuthorType = {
                        uid: data.uid,
                        avatar: companionAvatarUrl,
                        username: data.username
                    };

                    // Все юзеры чата
                    const users: UseAuthorType[] = [me, companion];

                    // Определение авторов сообщений
                    const newMessages: UseMessageType[] = responseChat.messages.map(message => ({
                        ...message,
                        author: message.authorUid === me.uid ? me : companion
                    }));

                    const newChat: UseChatType = {
                        chatID: responseChat.chatID,
                        messages: newMessages,
                        users
                    };

                    props.setChat(newChat)
                } catch (error: any) {
                    props.setError(error.message);
                }
            });
        } catch (error: any) {
            props.setError(error.message);
        }
    });
};
