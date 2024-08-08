import { collection, getCountFromServer, orderBy, query, where } from "firebase/firestore"
import { firestore } from "../../main"
import { UserState } from "../store/reducers/userSlice"

export const getRecommendedPostsCount = async (setError: React.Dispatch<React.SetStateAction<string | null>>, myUser: UserState) => {
    try {
        const posts = collection(firestore, 'posts')
        const q = query(posts,
            orderBy('likes', 'desc'),
            orderBy('dislikes', 'desc'),
            orderBy('comments', 'desc'),
            orderBy('createdAt', "desc"),
            where("authorUid", "!=", myUser.uid),
        )
        const snapshot = await getCountFromServer(q)
        return snapshot.data().count
    } catch (error: any) {
        console.log(error.message)
        setError(error.message)
    }
}