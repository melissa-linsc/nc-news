export function capitaliseStr(str) {
    const firstLetter = str.charAt(0).toUpperCase()
    const remaining = str.slice(1)
    return firstLetter + remaining
}
