import { UserState } from "../store/reducers/userSlice"
import { doc, getDoc } from "firebase/firestore";
import { firestore, storage } from "../../main";
import { getDownloadURL, ref } from "firebase/storage";

type getUserByUidProps = {
    uid: string;
}

export const getUserByUid = async (props: getUserByUidProps): Promise<UserState> => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = (await getDoc(doc(firestore, 'users', props.uid))).data() as UserState

            const avatarUrl = user.avatar && await getDownloadURL(ref(storage, user.avatar))
            const backgroundImageUrl = user.backgroundImage && await getDownloadURL(ref(storage, user.backgroundImage))

            user.avatar = avatarUrl
            user.backgroundImage = backgroundImageUrl
            
            resolve(user)
        } catch (error: any) {
            reject(error.message)
            console.log(error.message)
        }
    })
}