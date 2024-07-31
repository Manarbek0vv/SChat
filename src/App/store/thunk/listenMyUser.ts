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
            const backgroundImageUrl = props.response.backgroundImage && await getDownloadURL(ref(storage, props.response.backgroundImage))

            const newUser: UserState = {...props.response, avatar: avatarUrl, backgroundImage: backgroundImageUrl}
            return newUser
        } catch (error: any) {
            thunkApi.rejectWithValue(error.message)
        }
    }
)