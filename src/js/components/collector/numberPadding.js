
export function pad(num, size) {
    var s = parseInt(num) + ''
    while (s.length < size) s = '0' + s
    return s
}