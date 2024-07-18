import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { getDownloadURL, ref } from "firebase/storage";
import { storage } from "../../../main";

type ListenMyUserProps = {
    response: UserState;
}

export const listenMyUser = createAsyncThunk(
    'user/listenMyUser',
    async (props: ListenMyUserProps, thunkApi) => {
        try {
            const avatarUrl = props.response.avatar && await getDownloadURL(ref(storage, props.response.avatar))

            const newUser: UserState = {
                email: props.response.email,
                uid: props.response.uid,
                username: props.response.username,
                registered: props.response.registered,
                photos: props.response.photos,
                avatar: avatarUrl,
                posts: props.response.posts,
                friendRequests: props.response.friendRequests,
                friendRequestsSend: props.response.friendRequestsSend,
                friends: props.response.friends,
                chats: props.response.chats
            }
            return newUser
        } catch (error: any) {
            thunkApi.rejectWithValue(error.message)
        }
    }
)