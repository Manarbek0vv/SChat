import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { UserState } from "../reducers/userSlice"
import { firestore, storage } from "../../../main"
import { ImageType, UsePostAuthorType, UsePostCommentAuthorType, UsePostCommentType, UsePostType } from "../../components/types/post"
import { getUserByUid } from "../../secondaryFunctions/getUserByUid"
import { getDownloadURL, ref } from "firebase/storage"

export const fetchUserPosts = async (user: UserState) => {
    try {
        const querySnapshot = await getDocs(query(collection(firestore, 'posts'), where("authorUid", "==", user.uid)))
        const postsArray: UsePostType[] = []

        const myUser = (await getDoc(doc(firestore, 'users', user.uid))).data() as UserState
        const myUserAvatarUrl = myUser.avatar && 
        await getDownloadURL(ref(storage, myUser.avatar))
        const author: UsePostAuthorType = { uid: myUser.uid, username: myUser.username, avatar: myUserAvatarUrl }

        const mapArrayWithData = async () => {
            for (const doc of querySnapshot.docs) {
                const newPost = doc.data()
                newPost.author = author

                if (newPost.comments) {
                    const newComments: UsePostCommentType[] = []

                    for (let comment of newPost.comments) {
                        const getUserCommentAuthor = await getUserByUid({ uid: comment.author })

                        const userCommentAvatarUrl = getUserCommentAuthor.avatar && 
                        await getDownloadURL(ref(storage, getUserCommentAuthor.avatar))

                        const commentAuthor: UsePostCommentAuthorType = {
                            username: getUserCommentAuthor.username,
                            avatar: userCommentAvatarUrl,
                            uid: getUserCommentAuthor.uid
                        }
                        newComments.push({ ...comment, author: commentAuthor })
                    }

                    newPost.comments = newComments
                }
                if (!!newPost.images.length) {
                    const newImages: ImageType[] = []

                    for (let image of newPost.images) {
                        const imageUrl = await getDownloadURL(ref(storage, image.url))
                        newImages.push({ ...image, url: imageUrl })
                    }
                    newPost.images = newImages
                }
                postsArray.push(newPost as UsePostType);
            }
        }


        await mapArrayWithData()

        return postsArray
    } catch (error: any) {
        console.log(error.message)
    }
}
