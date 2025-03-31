'use client'
import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {useToast} from "@/hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomTable from "@/components/common/CustomTable";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import CustomPagination from "@/components/common/CustomPagination";

export default function MemberManagement() {
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    const {user} = useSelector((state: RootState) => state.auth)
    const [data, setData] = useState([])
    const [meta, setMeta] = useState({totalPages: 1, currentPage: 1, limit: 2})
    const {toast} = useToast()

    const fetchUsersByType = async (type: string) => {
        try {
            const resData = (await axiosInstance.get(
                `/users`,
                {
                    params: {
                        type: type,
                        page: meta.currentPage,
                        limit: meta.limit,
                    }
                }
            )).data;

            // Update table data
            resData?.values?.find(eachUser => {
                if (eachUser.id === user['userId']) {
                    eachUser.disableCheck = true;
                    return true; // Found and out
                }
                return false;
            })

            setData({
                columns: resData.columns,
                values: resData.values,
            });

            // Update meta
            setMeta({
                ...meta,
                currentPage: resData.meta.currentPage,
                totalPages: resData.meta.totalPages,
            })
        } catch (e) {
            console.log('Error: ', e)
            toast({
                title: "Xảy ra lỗi khi lấy thông tin",
                variant: "destructive",
            });
        }
    }

    const handleNextPage = () => {
        if (meta.currentPage < meta.totalPages) {
            setMeta({...meta, currentPage: meta.currentPage + 1});
        }
    }

    const handlePrevPage = () => {
        if (meta.currentPage > 1) {
            setMeta({...meta, currentPage: meta.currentPage - 1});
        }
    }

    const handleDeleteUsers = async (itemSelected: number[]) => {
        try {
            if (itemSelected.length > 0) {
                await axiosInstance.delete(
                    '/users/delete-users',
                    {
                        data: {
                            userItemIds: itemSelected,
                        }
                    },
                ).then((res) => {
                    if (res.data.affected > 0) {
                        toast({
                            title: "Xoá người dùng thành công",
                        })

                        setData((prevState) => ({
                            ...prevState, // Giữ nguyên phần `columns`
                            values: prevState.values.filter(item => !itemSelected.includes(item.id))
                        }));
                    }
                })
            } else {
                toast({
                    title: "Vui lòng chọn ít nhất 1 tài khoản",
                    variant: "warning",
                });
            }
        } catch (error) {
            toast({
                title: "Xoá người dùng thất bại",
                description: "Hãy thử lại sau",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        if (user && user['userId']) {
            fetchUsersByType(type);
        } else {
            console.warn('User is null or userId is missing');
        }
    }, [type, user, meta.currentPage]);

    return (
        <div>
            <PageBreadcrumb pageTitle={type.charAt(0).toUpperCase() + type.slice(1)}/>
            {
                data?.columns && (
                    <div className="space-y-6">
                        <CustomTable
                            tableTitle={'Danh sách tài khoản'}
                            tableData={data}
                            onSort={(key) => console.log(`Sorting by ${key}`)}
                            createItem={true}
                            deleteItem={true}
                            handleCreate={() => console.log('Create')}
                            handleDelete={(itemSelected) => handleDeleteUsers(itemSelected)}
                        />
                    </div>
                )
            }

            <CustomPagination
                currentPage={meta.currentPage}
                totalPages={meta.totalPages}
                handlePreviousPage={() => handlePrevPage()}
                handleNextPage={() => handleNextPage()}
                handleClickPage={(page) => setMeta(prev => ({
                    ...prev,
                    currentPage: page
                }))}
            />
        </div>
    )
}