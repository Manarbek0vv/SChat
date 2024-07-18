import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../main";
import { collection, doc, setDoc } from "firebase/firestore";
import { UserState } from "../reducers/userSlice";
import { Dispatch, SetStateAction } from "react";

type CreateUserProps = {
    username: string;
    email: string;
    password: string;
    setError: Dispatch<SetStateAction<string | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
}

export const createUser = createAsyncThunk(
    'user/createUser',
    async (props: CreateUserProps, thunkApi) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, props.email, props.password)
            const newUser: UserState = {
                username: props.username,
                email: props.email,
                uid: userCredential.user.uid,
                registered: Date.now(),
                photos: [],
                avatar: null,
                posts: [],
                friendRequests: [],
                friendRequestsSend: [],
                friends: [],
                chats: []
            }
            await setDoc(doc(collection(firestore, 'users'), newUser.uid), newUser)
            localStorage.setItem('current-user', newUser.uid)
            return newUser
        } catch (error: any) {
            props.setError(error.message as string)
            thunkApi.rejectWithValue(error.message)
            props.setLoading(false)
        }
    }
)