'use client'
import { useSelector } from "react-redux"
import { RootState } from '@/redux/store'

export default function HomePage() {
    const token = useSelector((state: RootState) => state.auth.token)
    
    return (
        <div>Token: {token}</div>
    )
}