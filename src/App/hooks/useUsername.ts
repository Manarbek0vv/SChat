import { Dispatch, SetStateAction, useState } from "react"

export const useUsername = (initalState: string, setError: Dispatch<SetStateAction<string | null>>) => {
    const [ username, setUsername ] = useState(initalState)

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        if (value.length && 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.includes(value.at(-1)?.toUpperCase() as string)) {
            setError('Username can only contain English letters')
            return
        }
        if (value.length > 30) {
            setError('Username must not contain more than 30 letters')
            return
        }
        if (value.length && '!@#$%^&*()=+-"\'`/\\<>:;[]{}'.includes(value.at(-1) as string)) {
            setError('The username must not contain special characters')
            return
        }
        setUsername(value)
    }

    return { username, onUsernameChange }
}