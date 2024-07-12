import { doc, getDoc } from "firebase/firestore"
import { firestore } from "../../main"
import { UserState } from "../store/reducers/userSlice"

export const getOutgoingRequests = async (user: UserState): Promise<UserState[]> => {
    return new Promise(async (resolve) => {
        try {
            const response: UserState[] = []

            for (const uid of user.friendRequestsSend as string[]) {
                const docRef = doc(firestore, 'users', uid)
                const docSnap = await getDoc(docRef)

                if (docSnap.exists()) {
                    response.push(docSnap.data() as UserState)
                }
            }
            resolve(response)
        } catch (error: any) {
            console.log(error.message)
        }
    })
}