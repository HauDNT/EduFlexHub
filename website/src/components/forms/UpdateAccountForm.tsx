'use client'
import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {useToast} from "@/hooks/use-toast";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {DetailFormInterface, UserDetailFormInterface} from "@/interfaces";
import axiosInstance, {handleAxiosError} from "@/utils/axiosInstance";
import {AdditionUserData} from "@/interfaces/entityDetail/additionUserData";
import {UpdateAccountBody, UpdateAccountBodyType} from "@/schemas/update-account.schema";
import InputField from "@/components/inputs/InputField";
import UploadImageButton from "@/components/common/UploadImgButton";
import {Gender, RoleEnum} from "@/enums";
import CustomButton from "@/components/buttons/CustomButton";
import ComponentCard from "@/components/common/ComponentCard";
import { formDataFromObject } from "@/utils/formDataFromObject";

const UpdateAccountForm = ({
    data: initialUserData,
    onUpdateSuccess,
}: DetailFormInterface<UserDetailFormInterface>) => {
    const { id } = initialUserData;
    const { toast } = useToast();
    const [userData, setUserData] = useState<UserDetailFormInterface>(initialUserData);

    const form = useForm<UpdateAccountBodyType>({
        resolver: zodResolver(UpdateAccountBody),
        defaultValues: {
            username: userData.username || '-',
            email: userData.email || '-',
            password: '',
            re_password: '',
            fullname: userData.fullname || '-',
            gender: userData.gender != null ? String(userData.gender) : '',
            address: userData.address || '-',
            phone_number: userData.phone_number || '-',
            role_id: userData.role_id != null ? String(userData.role_id) : '',
            avatar: undefined,
        }
    })

    const fetchAdditionUserData = async () => {
        try {
            const resData = (await axiosInstance.get<AdditionUserData>(`/users/addition-data?id=${id}`)).data;

            console.log('Addition data: ', resData);

            if (resData) {
                setUserData(prev => ({ ...prev, ...resData }));
            }
        } catch (error) {
            toast({
                title: 'Tải dữ liệu thất bại',
                description: handleAxiosError(error),
                variant: 'destructive',
            });
        }
    }

    const handleSubmit = async (value: UpdateAccountBodyType) => {
      try {
        const formData = formDataFromObject(value);

        const updateResponse = await axiosInstance.put('/users/update', formData, {
          headers: { 'Content-Type': 'multipart/form-data'}
        })

        if (updateResponse.data) {
          setUserData(updateResponse.data);

          toast({
            title: 'Cập nhật tài khoản quản trị thành công',
            variant: 'success',
          });

          console.log('User data: ', userData);

          await onUpdateSuccess?.(userData);
        }
      } catch (error) {
        toast({
          title: 'Cập nhật tài khoản khu thất bại',
          description: handleAxiosError(error),
          variant: 'destructive',
        });
      }
    }

    useEffect(() => {
        fetchAdditionUserData();
    }, []);

    useEffect(() => {
      if (!userData) return;

      form.reset({
        username: userData.username || '',
        email: userData.email || '',
        password: '',
        re_password: '',
        fullname: userData.fullname || '',
        gender: userData.gender != null ? String(userData.gender) : '',
        address: userData.address || '',
        phone_number: userData.phone_number || '',
        role_id: userData.role_id != null ? String(userData.role_id) : '',
        avatar: undefined,
      });
    }, [userData, form]);

    return (
        <ComponentCard title="Cập nhật thông tin tài khoản" className={'w-full'}>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(handleSubmit)}
                >
                    <div className="flex">
                        <div className="w-64 flex-1 p-2">
                            <FormField
                                control={form.control}
                                name={"username"}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Tên tài khoản</FormLabel>
                                        <FormControl>
                                            <InputField
                                                type="text"
                                                placeholder="VD: username01"
                                                value={field.value}
                                                disabled
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-48 flex-2">
                            <UploadImageButton
                                key={userData?.username || ''}
                                form={form}
                                label="Chọn Avatar"
                                name="avatar"
                                callback={async (file) => {
                                    form.setValue('avatar', file)
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 p-2">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({field}) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Mật khẩu mới</FormLabel>
                                        <FormControl>
                                            <InputField
                                                type="password"
                                                placeholder="Mật khẩu phải trùng khớp"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1 p-2">
                            <FormField
                                control={form.control}
                                name="re_password"
                                render={({field}) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Xác nhận mật khẩu mới</FormLabel>
                                        <FormControl>
                                            <InputField
                                                type="password"
                                                placeholder="Mật khẩu phải trùng khớp"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <hr/>
                    <div className="flex">
                        <div className="flex-1 p-2">
                            <FormField
                              control={form.control}
                              name="fullname"
                              render={({ field }) => (
                                <FormItem className="col-span-full">
                                  <FormLabel>Họ và tên</FormLabel>
                                  <FormControl>
                                    <InputField
                                      type="text"
                                      placeholder="VD: Nguyễn Văn A"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                        </div>
                        <div className="flex-1 p-2">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({field}) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <InputField
                                                type="email"
                                                placeholder="VD: nguyenvana@email.com"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 p-2">
                            <FormField
                                control={form.control}
                                name="address"
                                render={({field}) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Địa chỉ</FormLabel>
                                        <FormControl>
                                            <InputField
                                                type="text"
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1 p-2">
                            <FormField
                                control={form.control}
                                name="phone_number"
                                render={({field}) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Số điện thoại</FormLabel>
                                        <FormControl>
                                            <InputField
                                                type="text"
                                                placeholder=""
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex-1 p-2">
                            <FormField
                                control={form.control}
                                name="gender"
                                render={({field}) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Giới tính</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn giới tính"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={String(Gender.Male)}>Nam</SelectItem>
                                                <SelectItem value={String(Gender.Female)}>Nữ</SelectItem>
                                                <SelectItem value={String(Gender.Other)}>Khác</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex-1 p-2">
                            <FormField
                                control={form.control}
                                name="role_id"
                                render={({field}) => (
                                    <FormItem className="col-span-full">
                                        <FormLabel>Loại tài khoản</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value + ''}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Chọn loại tài khoản"/>
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value={String(RoleEnum.Student)}>Học viên</SelectItem>
                                                <SelectItem value={String(RoleEnum.Teacher)}>Giảng viên</SelectItem>
                                                <SelectItem value={String(RoleEnum.Staff)}>Nhân viên</SelectItem>
                                                <SelectItem value={String(RoleEnum.Admin)}>Admin</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex p-2">
                        <CustomButton type="submit" className='!mt-6 w-full' disabled={form.formState.isSubmitting}>
                            {form.formState.isSubmitting ? 'Đang cập nhật...' : 'Cập nhật'}
                        </CustomButton>
                    </div>

                    {
                      /* Tối nay làm nè bạn:
                        - Chưa cập nhật thì hiển thị nút bình thường. Khi ấn cập nhật mới thì ẩn nút & hiện biểu tượng loading (delay khoảng 2s để tránh spam)
                        - Hiển thị avatar của người dùng khi đã có sẵn (kèm nút cập nhật mới avatar ở dưới hình này), còn nếu chưa có thì giữ nguyên như hiện tại.
                        - 
                      */
                    }

                </form>
            </Form>
        </ComponentCard>
    )
}

export default UpdateAccountForm