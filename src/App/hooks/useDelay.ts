import { useState } from "react";

interface UseDelayProps {
    seconds: number;
}

export const useDelay = (props: UseDelayProps) => {
    const [ isAllowed, setIsAllowed ] = useState(false)

    const onStateChange = () => {
        setIsAllowed(false)
        setTimeout(() => {
            setIsAllowed(true)
        }, props.seconds)
    }

    return { isAllowed, onStateChange }
}