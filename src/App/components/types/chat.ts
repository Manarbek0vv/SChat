export type SendMessageType = {
    authorUid: string;
    message: string;
    createdAt: number;
}

export type SendChatType = {
    users: string[];
    messages: SendMessageType[];
    chatID: string;
}


// --------------------------------------------------------


export type UseAuthorType = {
    uid: string;
    avatar: string | null;
    username: string;
}


export type UseMessageType = {
    author: UseAuthorType;
    message: string;
    createdAt: number;
}

export type UseChatType = {
    users: UseAuthorType[];
    messages: UseMessageType[]
    chatID: string;
}