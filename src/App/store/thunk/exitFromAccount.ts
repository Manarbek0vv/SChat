import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { UserState } from "../reducers/userSlice";

type ExitFromAccountProps = {
    user: UserState;
}

export const exitFromAccount = createAsyncThunk(
    'user/exitFromAccount',
    async (props: ExitFromAccountProps) => {
        try {
            localStorage.removeItem('current-user')
            const userRef = doc(firestore, 'users', props.user.uid)
            updateDoc(userRef, { state: 'offline', lastChanges: Date.now() })
            return null
        } catch (error) {
            
        }
    }
)