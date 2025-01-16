'use server'
import { cookies } from "next/headers";

export const setCookie = async (name: string, value: any, options = {}) => {
    const cookieStore = await cookies();  // Thêm await ở đây

    cookieStore.set({
        name: name,
        value: value,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        ...options,
    });
}

export const getCookie = async (name: string) => {
    const cookieStore = await cookies();  // Thêm await ở đây
    return cookieStore.get(name);
}

const checkExistCookie = async (name: string) => { }