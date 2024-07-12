export const convertTimestampToString = (timestamp: number) => {
    const seconds = Math.floor(timestamp / 1000)

    if (seconds < 60) return `${seconds} seconds ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)} ${Math.floor(seconds / 60) === 1 ? 'minute' : 'minutes'} ago`
    if (seconds < 86_400) return `${Math.floor(seconds / 3600)} ${Math.floor(seconds / 3600) === 1 ? 'hour' : 'hours'} ago`
    if (seconds < 604_800) return `${Math.floor(seconds / 86_400)} ${Math.floor(seconds / 86_400) === 1 ? 'day' : 'days'} ago`
    if (seconds < 2_592_000) return `${Math.floor(seconds / 604_800)} ${Math.floor(seconds / 604_800) === 1 ? 'week' : 'weeks'} ago`
    if (seconds < 31_104_000) return `${Math.floor(seconds / 2_592_000)} ${Math.floor(seconds / 2_592_000) === 1 ? 'month' : 'months'} ago`
    return `${Math.floor(seconds / 31_104_000)} ${Math.floor(seconds / 31_104_000) === 1 ? 'year' : 'years'} ago`
}