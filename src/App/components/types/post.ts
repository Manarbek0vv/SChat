export type ImageType = {
    url: string;
    name: string;
    size: number;
}

export type UsePostCommentAuthorType = {
    uid: string;
    avatar: string | null;
    username: string;
}

export type UsePostCommentType = {
    author: UsePostCommentAuthorType;
    description: string;
    likes: string[];
    dislikes: string[];
    createdAt: number;
}

export type SendPostCommentType = {
    author: string;
    description: string;
    likes: string[];
    dislikes: string[];
    createdAt: number;
}

export type SendPostType = {
    authorUid: string;
    description: string;
    createdAt: number;
    likes: string[];
    dislikes: string[];
    comments: SendPostCommentType[] | null;
    whoCanSee: string;
    images: ImageType[];
    id: string;
}

export type UsePostAuthorType = {
    uid: string;
    avatar: string | null;
    username: string;
}

export type UsePostType = {
    author: UsePostAuthorType;
    description: string;
    createdAt: number;
    likes: string[];
    dislikes: string[];
    comments: UsePostCommentType[] | null;
    whoCanSee: string;
    images: ImageType[];
    id: string;
}