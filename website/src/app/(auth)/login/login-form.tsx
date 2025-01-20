'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { setReduxAuthToken } from '@/redux/authSlice'
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import axiosInstance from "@/utils/axiosInstance"
import { LoginBody, LoginBodyType } from '@/schemas/auth.schema'
import { LoginResponseInterface } from '@/interfaces/interfaces'
import { setCookie } from '@/utils/cookieManage'

const LoginForm: React.FC = () => {
    const router = useRouter()
    const { toast } = useToast()
    const dispatch = useDispatch()

    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
            username: '',
            password: '',
        }
    })

    const handleLogin = async (values: LoginBodyType) => {
        try {
            const result = await axiosInstance
                .post<LoginResponseInterface>(
                    '/auth/login',
                    { ...values }
                )
                .then(res => (
                    {
                        status: res.status,
                        payload: res.data,
                    }
                ))

            if (result.payload.accessToken) {
                await setCookie('userId', result.payload.userId)
                await setCookie('username', result.payload.username)
                await setCookie('accessToken', result.payload.accessToken)

                dispatch(setReduxAuthToken({
                    userId: result.payload.userId,
                    username: result.payload.username,
                    accessToken: result.payload.accessToken
                }))

                router.push('/home')
            }
        } catch (error) {
            toast({
                title: "Đăng nhập thất bại",
                variant: "destructive",
                description: `Mã lỗi: ${error}`
            })
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleLogin)}
                className="space-y-2 max-w-[600px] flex-1"
            >
                <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tài khoản</FormLabel>
                            <FormControl>
                                <Input placeholder="nva@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mật khẩu</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='!mt-6 w-full'>Đăng nhập</Button>
            </form>
        </Form>
    )
}

export default LoginForm