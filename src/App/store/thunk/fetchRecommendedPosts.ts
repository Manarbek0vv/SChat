import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { UserState } from "../reducers/userSlice"
import { firestore, storage } from "../../../main"
import { ImageType, SendPostType, UsePostAuthorType, UsePostCommentAuthorType, UsePostCommentType, UsePostType } from "../../components/types/post"
import { getUserByUid } from "../../secondaryFunctions/getUserByUid"
import { getDownloadURL, ref } from "firebase/storage"

export const fetchRecommendedPosts = async (user: UserState) => {
    try {
        const querySnapshot = await getDocs(collection(firestore, 'posts'))
        const postsArray: UsePostType[] = []

        const mapArrayWithData = async () => {
            for (const docSnapshot of querySnapshot.docs) {
                const newPost = docSnapshot.data();

                const myUser = (await getDoc(doc(firestore, 'users', newPost.authorUid))).data() as UserState

                if (myUser.isClosedAccount && !myUser.friends.includes(user.uid)) {
                    continue
                }

                const myUserAvatarUrl = myUser.avatar && 
                await getDownloadURL(ref(storage, myUser.avatar))
                const author: UsePostAuthorType = { uid: myUser.uid, username: myUser.username, avatar: myUserAvatarUrl }
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

                if (
                    newPost.author.uid !== user.uid
                ) {
                    postsArray.push(newPost as UsePostType)
                }
            }
        }

        await mapArrayWithData()

        postsArray
            .sort((a, b) => b.likes.length - a.likes.length)
            .sort((a, b) => b.dislikes.length - a.dislikes.length)
            .sort((a, b) => {
                if (a.comments && b.comments) {
                    return b.comments.length - a.comments.length
                }
                return 0
            })

        return postsArray
    } catch (error: any) {
        console.log(error.message)
    }
}

