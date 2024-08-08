import { collection, getCountFromServer } from "firebase/firestore"
import { firestore } from "../../main"

export const getLatestPostsCount = async (setError: React.Dispatch<React.SetStateAction<string | null>>) => {
    try {
        const usersRef = collection(firestore, 'posts')
        const snapshot = await getCountFromServer(usersRef)
        return snapshot.data().count
    } catch (error: any) {
        console.log(error.message)
        setError(error.message)
    }
}