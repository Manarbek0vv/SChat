import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore, storage } from "../../../main";
import { doc, getDoc } from "firebase/firestore";
import { UserState } from "../reducers/userSlice";
import { Dispatch, SetStateAction } from "react";
import { getDownloadURL, ref } from "firebase/storage";

type LoginUserProps = {
    email: string;
    password: string;
    setError: Dispatch<SetStateAction<string | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (props: LoginUserProps, thunkApi) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, props.email, props.password)
            const response = await getDoc(doc(firestore, 'users/' + userCredential.user.uid))
            const responseUser = response.data() as UserState

            // Получение аватарки пользователя из storage

            const avatarUrl = responseUser.avatar && await getDownloadURL(ref(storage, responseUser.avatar))
            const backgroundImageUrl = responseUser.backgroundImage && await getDownloadURL(ref(storage, responseUser.backgroundImage))

            // -------------------------------------------

            const newUser: UserState = {
                email: props.email,
                uid: userCredential.user.uid,
                username: responseUser.username,
                registered: responseUser.registered,
                photos: responseUser.photos,
                avatar: avatarUrl,
                posts: responseUser.posts,
                friendRequests: responseUser.friendRequests,
                friendRequestsSend: responseUser.friendRequestsSend,
                friends: responseUser.friends,
                chats: responseUser.chats,
                backgroundImage: backgroundImageUrl,
                gender: responseUser.gender,
                birthday: responseUser.birthday,
                isEmailVisible: responseUser.isEmailVisible,
                isClosedAccount: responseUser.isClosedAccount,
                blackList: responseUser.blackList
            }
            localStorage.setItem('current-user', userCredential.user.uid)
            return newUser
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
            props.setLoading(false)
        }
    }
)