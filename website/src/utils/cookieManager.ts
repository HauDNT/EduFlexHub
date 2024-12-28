'use server'
import {cookies} from "next/headers";

export const setCookie: Promise<void> = async (name: string, value: any, options = {}) => {
    const cookieStore = await cookies();

    cookieStore.set({
        name: name,
        value: value,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict',
        ...options,
    })
}

export const getCookie: Promise<any> = async (name: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(name);
}

const checkExistCookie: Promise<boolean> = async (name: string) => { }