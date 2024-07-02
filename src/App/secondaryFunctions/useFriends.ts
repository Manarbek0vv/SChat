import { useMemo } from "react";
import { UserState } from "../store/reducers/userSlice";

export function useFriends(friends: UserState[], searchValue: string) {
    const searchedFriends = useMemo(() => {
        if (!searchValue) return friends
        return friends.filter((friend: UserState) => {
            console.log('filter')
            return friend.username.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        })
    }, [friends, searchValue])

    return searchedFriends
}