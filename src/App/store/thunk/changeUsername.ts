import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, firestore } from "../../../main";
import { doc, updateDoc } from "firebase/firestore";
import { UserState } from "../reducers/userSlice";
import { Dispatch, SetStateAction } from "react";

interface ChangeUsernameProps {
    user: UserState;
    newUsername: string;
    password: string;
    setError: Dispatch<SetStateAction<string | null>>;
    setLoading: Dispatch<SetStateAction<boolean>>;
    setIsVisible: Dispatch<SetStateAction<boolean>>
}

export const changeUsername = createAsyncThunk(
    'user/changeUsername',
    async (props: ChangeUsernameProps, thunkApi) => {
        try {
            await signInWithEmailAndPassword(auth, props.user.email, props.password)

            props.setLoading(true)

            await updateDoc(doc(firestore, 'users', props.user.uid), {
                username: props.newUsername
            })

            props.setIsVisible(false)

        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
            props.setLoading(false)
        }
    }
)