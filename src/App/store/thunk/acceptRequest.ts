import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { Dispatch, SetStateAction } from "react";

type AcceptRequestProps = {
    user: UserState;
    myUser: UserState;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const acceptRequest = createAsyncThunk(
    'user/acceptRequest',
    async (props: AcceptRequestProps, thunkApi) => {
        try {
            await updateDoc(doc(firestore, 'users', props.myUser.uid), {
                friendRequests: arrayRemove(props.user.uid),
                friends: arrayUnion(props.user.uid)
            })
            await updateDoc(doc(firestore, 'users', props.user.uid), {
                friendRequestsSend: arrayRemove(props.myUser.uid),
                friends: arrayUnion(props.myUser.uid)
            })

            props.setError(`You are now friends with ${props.user.username}`)
            return {
                ...props.myUser, 
                friendRequests: props.myUser.friendRequests.filter(friendUid => friendUid !== props.user.uid),
                friends: [...props.myUser.friends, props.user.uid]
            }
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)