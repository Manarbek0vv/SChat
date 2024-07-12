import { UserState } from "../store/reducers/userSlice"
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../main";

type getUserByUidProps = {
    uid: string;
}

export const getUserByUid = async (props: getUserByUidProps): Promise<UserState> => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = (await getDoc(doc(firestore, 'users', props.uid))).data()
            resolve(user as UserState)
        } catch (error: any) {
            reject(error.message)
            console.log(error.message)
        }
    })
}