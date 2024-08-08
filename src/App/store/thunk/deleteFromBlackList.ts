import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";

interface DeleteFromBlackListProps {
    myUser: UserState;
    user: UserState;
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const deleteFromBlackList = createAsyncThunk(
    'user/deleteFromBlackList',
    async (props: DeleteFromBlackListProps, thunkApi) => {
        try {
            await updateDoc(doc(firestore, 'users', props.myUser.uid), {
                blackList: arrayRemove(props.user.uid)
            })
            props.setError(`You removed ${props.user.username} from the blacklist`)
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)