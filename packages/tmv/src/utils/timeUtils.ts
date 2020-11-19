export const timeFormat = function (second: number) {
    second = Math.round(second)
    const h = Math.round(second / 3600)
    const m = Math.round((second % 3600) / 60)
    const s = second % 60

    let timeStr = h > 0 ? `${h}:` : ''
    timeStr += m > 0 ? `${m}:` : '0:'
    timeStr += s > 9 ? s : `0${s}`

    return timeStr
}
