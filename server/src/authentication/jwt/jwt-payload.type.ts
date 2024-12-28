export interface UserLoginPayload {
    userId: number | string,
    username?: string,
    email?: string,
    provider_token?: string,
}