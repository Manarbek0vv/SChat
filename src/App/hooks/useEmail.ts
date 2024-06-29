import { Dispatch, SetStateAction, useState } from "react";

export const useEmail = (initialState: string, setError: Dispatch<SetStateAction<string | null>>) => {
    const [ email, setEmail ] = useState(initialState)

    const onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        if (value.length && (value[0] === '@' || value[0] === '.')) {
            setError('Incorrect email')
            return
        }
        if (value.length && 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ!#$%^&*()=+-{}[,]`\':;<>/\\'.includes(value.at(-1)?.toUpperCase() as string)) {
            setError('The last character is not valid')
            return
        }
        setEmail(value)
    }

    return { email, onEmailChange }
}