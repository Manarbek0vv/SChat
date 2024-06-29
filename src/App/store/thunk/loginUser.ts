import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../main";
import { doc, getDoc } from "firebase/firestore";

type LoginUserProps = {
    email: string;
    password: string;
    setError: any;
}

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (props: LoginUserProps, thunkApi) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, props.email, props.password)
            const response = await getDoc(doc(firestore, 'users/' + userCredential.user.uid))
            const newUser = {
                email: props.email,
                uid: userCredential.user.uid,
                username: response.data.username
            }
            return newUser
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)