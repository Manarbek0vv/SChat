import { collection, getCountFromServer, query, where } from "firebase/firestore"
import { firestore } from "../../main"
import { UserState } from "../store/reducers/userSlice"

export const getFriendPostsCount = async (setError: React.Dispatch<React.SetStateAction<string | null>>, myUser: UserState) => {
    try {
        const postsRef = collection(firestore, 'posts')
        const q = query(postsRef, where("authorUid", "in", [...myUser.friends, 'test']))
        const snapshot = await getCountFromServer(q)
        return snapshot.data().count
    } catch (error: any) {
        console.log(error.message)
        setError(error.message)
    }
}