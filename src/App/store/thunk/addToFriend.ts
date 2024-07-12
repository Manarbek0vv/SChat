import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";
import { Dispatch, SetStateAction } from "react";

type AddToFriendProps = {
    user: UserState;
    myUser: UserState;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const addToFriend = createAsyncThunk(
    'user/addToFriend',
    async (props: AddToFriendProps, thunkApi) => {
        try {
            await updateDoc(doc(firestore, 'users', props.user.uid), {
                friendRequests: arrayUnion(props.myUser.uid)
            })
            await updateDoc(doc(firestore, 'users', props.myUser.uid), {
                friendRequestsSend: arrayUnion(props.user.uid)
            })

            props.setError('You have successfully sent a friend request')
            return {...props.myUser, friendRequestsSend: [...props.myUser.friendRequestsSend, props.user.uid]}
        } catch (error: any) {
            props.setError(error.message)
            thunkApi.rejectWithValue(error.message)
        }
    }
)