import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { Dispatch, SetStateAction } from "react";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";

type DeclineRequestsProps = {
    user: UserState;
    myUser: UserState;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const declineRequests = createAsyncThunk(
    'user/declineRequests',
    async (props: DeclineRequestsProps, thunkApi) => {
        try {
            await updateDoc(doc(firestore, 'users', props.myUser.uid), {
                friendRequests: arrayRemove(props.user.uid)
            })
            await updateDoc(doc(firestore, 'users', props.user.uid), {
                friendRequestsSend: arrayRemove(props.myUser.uid)
            })

            return {
                ...props.myUser, 
                friendRequests: props.myUser.friendRequests.filter(friendUid => friendUid !== props.user.uid)
            }
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)