'use client'
import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {useToast} from "@/hooks/use-toast";
import axiosInstance from "@/utils/axiosInstance";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomTable from "@/components/common/CustomTable";

export default function MemberManagement() {
    const searchParams = useSearchParams()
    const type = searchParams.get('type')
    const [data, setData] = useState([])
    const {toast} = useToast()

    const fetchUsersByType = async (type: string) => {
        try {
            const res = await axiosInstance.get(`/users?type=${type}`);
            setData(res.data);
        } catch (e) {
            toast({
                title: "Xảy ra lỗi khi lấy thông tin",
                variant: "destructive",
            });
        }
    }

    useEffect(() => {
        fetchUsersByType(type)
    }, [type])

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
                        />
                    </div>
                )
            }
        </div>
    )
}