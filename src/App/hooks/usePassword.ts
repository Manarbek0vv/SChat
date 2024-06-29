import { Dispatch, SetStateAction, useState } from "react"

export const usePassword = (initialState: string, setError: Dispatch<SetStateAction<string | null>>) => {
    const [ password, setPassword ] = useState(initialState)

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (value.length > 20) { setError('Password is too long'); return }
        if (value.length && 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'.includes(value.at(-1)?.toUpperCase() as string)) {
            setError('Invalid character')
            return
        }
        setPassword(value)
    }

    return { password, onPasswordChange }
}