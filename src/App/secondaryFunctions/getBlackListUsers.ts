import { doc, getDoc } from "firebase/firestore"
import { UserState } from "../store/reducers/userSlice"
import { firestore, storage } from "../../main"
import { getDownloadURL, ref } from "firebase/storage"

export const getBlackListUsers = async (user: UserState): Promise<UserState[]> => {
    return new Promise(async (resolve, reject) => {
        try {
            const response: UserState[] = []

            for (const uid of user.blackList as string[]) {
                const docRef = doc(firestore, 'users', uid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    const user = docSnap.data() as UserState
                    user.avatar = user.avatar && await getDownloadURL(ref(storage, user.avatar))
                    response.push(user)
                }
            }
            resolve(response)
        } catch (error: any) {
            reject(error.message)
        }
    })
}