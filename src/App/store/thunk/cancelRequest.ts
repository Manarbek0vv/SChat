import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { Dispatch, SetStateAction } from "react";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";

type CancelRequestProps = {
    user: UserState;
    myUser: UserState;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const cancelRequest = createAsyncThunk(
    'user/cancelRequest',
    async (props: CancelRequestProps, thunkApi) => {
        try {
            await updateDoc(doc(firestore, 'users', props.myUser.uid), {
                friendRequestsSend: arrayRemove(props.user.uid)
            })
            await updateDoc(doc(firestore, 'users', props.user.uid), {
                friendRequests: arrayRemove(props.myUser.uid)
            })

            return {
                ...props.myUser, 
                friendRequestsSend: props.myUser.friendRequestsSend.filter(friendUid => friendUid !== props.user.uid)
            }
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)