import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import sidebarReducer from './sidebarSlice'

// export type RootState = {
//     auth: {
//         user: { userid: string; username: string, role: string } | null
//         token: string | null
//     };
// }

const store = configureStore({
    reducer: {
        auth: authReducer,
        sidebar: sidebarReducer,
    }
})

// Lấy kiểu RootState từ store
export type RootState = ReturnType<typeof store.getState>;

// Lấy kiểu AppDispatch từ store
export type AppDispatch = typeof store.dispatch;

export default store