import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";

interface SaveNewSettingsProps {
    myUser: UserState;
    isEmailVisible: boolean;
    birthday: number | null;
    gender: 'Male' | 'Female' | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const saveNewSettings = createAsyncThunk(
    'saveNewSettings',
    async (props: SaveNewSettingsProps, thunkApi) => {
        try {
            await updateDoc(doc(firestore, 'users', props.myUser.uid), {
                isEmailVisible: props.isEmailVisible,
                birthday: props.birthday,
                gender: props.gender
            })
            props.setError('Settings saved successfully!')
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)