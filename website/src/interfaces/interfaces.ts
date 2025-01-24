export interface LoginResponseInterface {
    userId: string,
    username: string,
    accessToken: string,
}

interface ReduxUserState {
    userId: string,
    username: string,
}

export interface ReduxAuthState {
    user: ReduxUserState | null,
    token: string | null,
}

export interface StepResetForm {
    id: string | number,
    name: string,
    fieldsName: string[],
}