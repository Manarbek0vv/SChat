import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { createUser } from "../thunk/createUser";
import { loginUser } from "../thunk/loginUser";
import { loginWithStorage } from "../thunk/loginWithStorage";
import { PhotoType, addPhoto } from "../thunk/addPhoto";
import { updateAvatar } from "../thunk/updateAvatar";
import { deleteAvatar } from "../thunk/deleteAvatar";
import { addNewPost } from "../thunk/addNewPost";
import { exitFromAccount } from "../thunk/exitFromAccount";
import { deletePost } from "../thunk/deletePost";
import { UsePostType } from "../../components/types/post";
import { fetchMyPosts } from "../thunk/fetchMyPosts";
import { likePost } from "../thunk/likePost";
import { dislikePost } from "../thunk/dislikePost";
import { addComment } from "../thunk/addComment";
import { deleteComment } from "../thunk/deleteComment";
import { likeComment } from "../thunk/likeComment";
import { dislikeComment } from "../thunk/dislikeComment";
import { fetchLatestPosts } from "../thunk/fetchLatestPosts";
import { fetchRecomendedPosts } from "../thunk/fetchRecomendedPosts";
import { addToFriend } from "../thunk/addToFriend";
import { removeFromFriends } from "../thunk/removeFromFriends";
import { cancelRequest } from "../thunk/cancelRequest";
import { acceptRequest } from "../thunk/acceptRequest";
import { declineRequests } from "../thunk/declineRequest";
import { fetchFriendPosts } from "../thunk/fetchFriendPosts";

export type UserState = {
    uid: string;
    username: string;
    email: string;
    friends: string[];
    state?: string;
    lastChanges?: number;
    photos: PhotoType[];
    birthday?: Date;
    gender?: 'Male' | 'Female';
    registered: number;
    avatar: string | null;
    posts: string[];
    friendRequests: string[];
    friendRequestsSend: string[];
}

type UserSliceState = {
    user: UserState | null;
    posts: UsePostType[];
}

const initialState: UserSliceState = {
    user: null,
    posts: []
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUser.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
            if (action.payload) state.user = action.payload
        })
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
            if (action.payload) state.user = action.payload
        })
        builder.addCase(loginWithStorage.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
            if (action.payload) state.user = action.payload
        })
        builder.addCase(addPhoto.fulfilled, (state, action: PayloadAction<PhotoType | undefined>) => {
            if (action.payload) state.user?.photos.push(action.payload)
        })
        builder.addCase(updateAvatar.fulfilled, (state, action: PayloadAction<string | undefined>) => {
            if (action.payload) (state.user as UserState).avatar = action.payload
        })
        builder.addCase(deleteAvatar.fulfilled, (state) => {
            (state.user as UserState).avatar = null
        })
        builder.addCase(addNewPost.fulfilled, (state, action: PayloadAction<string | undefined>) => {
            if (action.payload) state.user?.posts.push(action.payload)
        })
        builder.addCase(exitFromAccount.fulfilled, (state, action: PayloadAction<null | undefined>) => {
            if (action.payload === null) state.user = action.payload
        })
        builder.addCase(deletePost.fulfilled, (state, action: PayloadAction<string[] | undefined>) => {
            if (action.payload) (state.user as UserState).posts = action.payload
        })
        builder.addCase(fetchMyPosts.fulfilled, (state, action: PayloadAction<UsePostType[] | undefined>) => {
            if (action.payload) state.posts = action.payload
        })
        builder.addCase(fetchRecomendedPosts.fulfilled, (state, action: PayloadAction<UsePostType[] | undefined>) => {
            if (action.payload) state.posts = action.payload
        })
        builder.addCase(fetchLatestPosts.fulfilled, (state, action: PayloadAction<UsePostType[] | undefined>) => {
            if (action.payload) state.posts = action.payload
        })
        builder.addCase(fetchFriendPosts.fulfilled, (state, action: PayloadAction<UsePostType[] | undefined>) => {
            if (action.payload) state.posts = action.payload
        })
        builder.addCase(likePost.fulfilled, (state, action: PayloadAction<UsePostType[] | undefined>) => {
            if (action.payload) state.posts = action.payload
        })
        builder.addCase(dislikePost.fulfilled, (state, action: PayloadAction<UsePostType[] | undefined>) => {
            if (action.payload) state.posts = action.payload
        })

        builder.addCase(addComment.fulfilled, (state, action: PayloadAction<UsePostType[] | undefined>) => {
            if (action.payload) state.posts = action.payload
        })
        builder.addCase(deleteComment.fulfilled, (state, action: PayloadAction<UsePostType[] | undefined>) => {
            if (action.payload) state.posts = action.payload
        })
        builder.addCase(likeComment.fulfilled, (state, action: PayloadAction<UsePostType[] | undefined>) => {
            if (action.payload) state.posts = action.payload
        })
        builder.addCase(dislikeComment.fulfilled, (state, action: PayloadAction<UsePostType[] | undefined>) => {
            if (action.payload) state.posts = action.payload
        })
        builder.addCase(addToFriend.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
            if (action.payload) state.user = action.payload
        })
        builder.addCase(removeFromFriends.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
            if (action.payload) state.user = action.payload
        })
        builder.addCase(cancelRequest.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
            if (action.payload) state.user = action.payload
        })
        builder.addCase(acceptRequest.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
            if (action.payload) state.user = action.payload
        })
        builder.addCase(declineRequests.fulfilled, (state, action: PayloadAction<UserState | undefined>) => {
            if (action.payload) state.user = action.payload
        })
    }
})