import { createSlice } from '@reduxjs/toolkit'
import { ReduxAuthState } from '@/interfaces'

const initialState: ReduxAuthState = {
    userAuth: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setReduxAuthToken: (state, action) => {
            state.userAuth = {
                userId: action.payload.userId,
                username: action.payload.username ?? undefined,
                email: action.payload.email ?? undefined,
                role: action.payload.role ?? 1,
            };
            state.token = action.payload.accessToken;
        },
        removeReduxAuthToken: (state) => {
            state.userAuth = null;
            state.token = null;
        }
    }
})

export const { setReduxAuthToken, removeReduxAuthToken } = authSlice.actions
export default authSlice.reducer