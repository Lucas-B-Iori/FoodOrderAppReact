export function isEmail(email) {
    return email.includes("@")
}

export function isLongerEnough(text, size) {
    return text.length >= size
}