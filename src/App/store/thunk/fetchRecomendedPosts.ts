import { collection, doc, getDoc, getDocs } from "firebase/firestore"
import { UserState } from "../reducers/userSlice"
import { firestore } from "../../../main"
import { UsePostAuthorType, UsePostCommentAuthorType, UsePostCommentType, UsePostType } from "../../components/types/post"
import { getUserByUid } from "../../secondaryFunctions/getUserByUid"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchRecomendedPosts = createAsyncThunk(
    'user/fetchRecomendedPosts',
    async (user: UserState, thunkApi) => {
        try {
            const querySnapshot = await getDocs(collection(firestore, 'posts'))
            const postsArray: UsePostType[] = []

            const mapArrayWithData = async () => {
                for (const docSnapshot of querySnapshot.docs) {
                    const newPost = docSnapshot.data()

                    const myUser = (await getDoc(doc(firestore, 'users', newPost.authorUid))).data() as UserState
                    const author: UsePostAuthorType = { uid: myUser.uid, username: myUser.username, avatar: myUser.avatar }
                    newPost.author = author

                    if (newPost.comments) {
                        const newComments: UsePostCommentType[] = []

                        for (let comment of newPost.comments) {
                            const getUserCommentAuthor = await getUserByUid({ uid: comment.author })
                            const commentAuthor: UsePostCommentAuthorType = {
                                username: getUserCommentAuthor.username,
                                avatar: getUserCommentAuthor.avatar,
                                uid: getUserCommentAuthor.uid
                            }
                            newComments.push({ ...comment, author: commentAuthor })
                        }
                        newPost.comments = newComments
                    }

                    if (newPost.author.uid !== user.uid) postsArray.push(newPost as UsePostType)
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

                console.log(postsArray)
            return postsArray
        } catch (error: any) {
            return thunkApi.rejectWithValue(error.message)
        }
    }
)
