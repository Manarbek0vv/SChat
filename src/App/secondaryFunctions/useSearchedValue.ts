import { useMemo } from "react";
import { UserState } from "../store/reducers/userSlice";

export function useSearchedValue(users: UserState[], searchValue: string) {
    const searchedUsers = useMemo(() => {
        if (!searchValue) return users
        return users.filter((friend: UserState) => {
            return friend.username.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
        })
    }, [users, searchValue])

    return searchedUsers
}