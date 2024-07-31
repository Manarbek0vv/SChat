import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";

interface AddToBlackListProps {
    myUser: UserState;
    user: UserState;
    setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const addToBlackList = createAsyncThunk(
    'user/addToBlackList',
    async (props: AddToBlackListProps, thunkApi) => {
        try {
            await updateDoc(doc(firestore, 'users', props.myUser.uid), {
                blackList: arrayUnion(props.user.uid),
                friends: arrayRemove(props.user.uid),
                friendRequests: arrayRemove(props.user.uid),
                friendRequestsSend: arrayRemove(props.user.uid)
            })
            await updateDoc(doc(firestore, 'users', props.user.uid), {
                friends: arrayRemove(props.myUser.uid),
                friendRequests: arrayRemove(props.myUser.uid),
                friendRequestsSend: arrayRemove(props.myUser.uid)
            })
            props.setError(`You have added ${props.user.username} to the blacklist`)
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)