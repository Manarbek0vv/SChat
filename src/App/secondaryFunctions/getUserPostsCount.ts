import { collection, getCountFromServer, query, where } from "firebase/firestore"
import { firestore } from "../../main"
import { UserState } from "../store/reducers/userSlice"

export const getUserPostsCount = async (setError: React.Dispatch<React.SetStateAction<string | null>>, user: UserState) => {
    try {
        const posts = collection(firestore, 'posts')
        const q = query(posts,
            where("authorUid", "==", user.uid)
        )
        const snapshot = await getCountFromServer(q)
        return snapshot.data().count
    } catch (error: any) {
        console.log(error.message)
        setError(error.message)
    }
}