import { ReduxUserState } from "@/interfaces/reduxUserState";

export interface ReduxAuthState {
    userAuth: ReduxUserState | null,
    token: string | null,
}