export const convertBytes = (bytes: number)  => {
    if (bytes < 1024) return `${bytes} Bytes`
    if (bytes < 1_048_576) return `${Math.floor(bytes / 1024)} KB`
    return `${Math.floor(bytes / 1_048_576)} MB`
}