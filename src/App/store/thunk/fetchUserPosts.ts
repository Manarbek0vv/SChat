import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore"
import { UserState } from "../reducers/userSlice"
import { firestore } from "../../../main"
import { UsePostAuthorType, UsePostCommentAuthorType, UsePostCommentType, UsePostType } from "../../components/types/post"
import { getUserByUid } from "../../secondaryFunctions/getUserByUid"
import { createAsyncThunk } from "@reduxjs/toolkit"

export const fetchUserPosts = createAsyncThunk(
    'user/fetchUserPosts',
    async (user: UserState, thunkApi) => {
        try {
            const querySnapshot = await getDocs(query(collection(firestore, 'posts'), where("authorUid", "==", user.uid)))
            const postsArray: UsePostType[] = []

            const myUser = (await getDoc(doc(firestore, 'users', user.uid))).data() as UserState
            const author: UsePostAuthorType = { uid: myUser.uid, username: myUser.username, avatar: myUser.avatar }

            const mapArrayWithData = async () => {
                for (const doc of querySnapshot.docs) {
                    const newPost = doc.data()
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
                    postsArray.push(newPost as UsePostType);
                }
            }


            await mapArrayWithData()

            return postsArray
        } catch (error: any) {
            thunkApi.rejectWithValue(error.message)
        }
    }
)