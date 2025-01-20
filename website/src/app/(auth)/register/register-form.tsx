'use client'
import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import Link from "next/link";
import {HttpStatusCode} from "axios";
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
import { IoIosArrowBack } from "react-icons/io"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import axiosInstance, {handleAxiosError} from "@/utils/axiosInstance"
import { RegisterBody, RegisterBodyType } from '@/schemas/auth.schema'

const RegisterForm: React.FC = () => {
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<RegisterBodyType>({
        resolver: zodResolver(RegisterBody),
        defaultValues: {
            username: '',
            password: '',
            re_password: '',
        }
    })

    const handleRegister = async (values: RegisterBodyType) => {
        try {
            if (!values) {
                toast({
                    title: "Vui lòng điền đẩy đủ thông tin",
                    variant: "destructive",
                });
                return;
            }

            if (values.re_password !== values.password) {
                toast({
                    title: "Đăng ký thất bại",
                    description: "Mật khẩu không trùng khớp",
                    variant: "destructive",
                });
                return;
            }

            const result = await axiosInstance.post<any>('/auth/register', { ...values });

            if (result.status === HttpStatusCode.Created) {
                toast({
                    title: "Đăng ký thành công",
                    description: "Bạn có thể sử dụng tài khoản này để đăng nhập"
                });
                router.push('/login');
            }
        } catch (error) {
            const errorMessage = handleAxiosError(error);

            toast({
                title: "Đăng ký thất bại",
                description: errorMessage,
                variant: "destructive",
            });
        }
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleRegister)}
                className="space-y-2 max-w-[600px] flex-1 bg-white p-6 rounded shadow-lg border-gray-950"
            >
                <h1 className="text-3xl font-bold text-blue-600 mb-4 text-center">Đăng ký tài khoản EduFlexHub</h1>
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
                <FormField
                    control={form.control}
                    name="re_password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Xác nhận mật khẩu</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className='!mt-6 w-full'>Đăng ký</Button>

                <Link href='/login' className='flex justify-center items-center !mt-4'>
                    <IoIosArrowBack size={20}/>
                    <span>Quay lại</span>
                </Link>
            </form>
        </Form>
    )
}

export default RegisterForm