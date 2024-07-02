import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../main";
import { collection, doc, setDoc } from "firebase/firestore";

type CreateUserProps = {
    username: string;
    email: string;
    password: string;
    setError: any;
}

export const createUser = createAsyncThunk(
    'user/createUser',
    async (props: CreateUserProps, thunkApi) => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, props.email, props.password)
            const newUser = {
                username: props.username,
                email: props.email,
                uid: userCredential.user.uid,
            }
            await setDoc(doc(collection(firestore, 'users'), newUser.uid), newUser)
            localStorage.setItem('current-user', newUser.uid)
            return newUser
        } catch (error: any) {
            props.setError(error.message as string)
            thunkApi.rejectWithValue(error.message)
        }
    }
)