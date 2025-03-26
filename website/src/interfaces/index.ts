import { Theme} from "@/types";

// Authen
export interface LoginResponseInterface {
    userId: string,
    username: string,
    accessToken: string,
}

// Redux
interface ReduxUserState {
    userId: string,
    username: string,
}

export interface ReduxAuthState {
    user: ReduxUserState | null,
    token: string | null,
}

// Reset password form steps
export interface StepResetForm {
    id: string | number,
    name: string,
    fieldsName: string[],
}

// Theme
export interface ThemeState {
    theme: Theme;
    isInitialized: boolean;
}
