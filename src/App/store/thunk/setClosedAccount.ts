import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { UserState } from "../reducers/userSlice";

interface SetClosedAccountProps {
    setError: React.Dispatch<React.SetStateAction<string | null>>
    myUser: UserState;
    value: boolean;
}

export const setClosedAccount = createAsyncThunk(
    'user/setClosedAccount',
    async (props: SetClosedAccountProps, thunkApi) => {
        try {
            await updateDoc(doc(firestore, 'users', props.myUser.uid), {
                isClosedAccount: props.value
            })
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)