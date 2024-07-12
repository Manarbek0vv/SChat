import { createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../reducers/userSlice";
import { Dispatch, SetStateAction } from "react";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../../../main";

type RemoveFromFriendsProps = {
    user: UserState;
    myUser: UserState;
    setError: Dispatch<SetStateAction<string | null>>;
}

export const removeFromFriends = createAsyncThunk(
    'user/removeFromFriends',
    async (props: RemoveFromFriendsProps, thunkApi): Promise<any> => {
        try {
            await Promise.all([
                updateDoc(doc(firestore, 'users', props.myUser.uid), {
                    friends: arrayRemove(props.user.uid)
                }),
                updateDoc(doc(firestore, 'users', props.user.uid), {
                    friends: arrayRemove(props.myUser.uid)
                }),
            ])

            props.setError(`You have removed ${props.user.username} from your friends list`)
            return {
                ...props.myUser, friends: props.myUser.friends.filter(friendUid => friendUid !== props.user.uid)
            }
        } catch (error: any) {
            props.setError(error)
            thunkApi.rejectWithValue(error)
        }
    }
)