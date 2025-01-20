import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'

export type RootState = {
    auth: {
        user: { userid: string; username: string } | null
        token: string | null
    };
}

const store = configureStore({
    reducer: {
        auth: authReducer
    }
})

export default store