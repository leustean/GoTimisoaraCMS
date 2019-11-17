export default interface User {
    userId: number
    username: string,
    email: string,
    fullName: string
}

export interface LoginFormUser {
    username: string,
    password: string
}