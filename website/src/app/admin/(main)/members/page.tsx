'use client'
import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'next/navigation';
import {useToast} from "@/hooks/use-toast";
import {HttpStatusCode} from "axios";
import axiosInstance, {handleAxiosError} from "@/utils/axiosInstance";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomTable from "@/components/table/CustomTable";
import {useSelector} from "react-redux";
import {RootState} from "@/redux/store";
import CustomPagination from "@/components/common/CustomPagination";
import CreateNewAccountForm from "@/components/forms/CreateNewAccountForm";
import ModelLayer from "@/components/common/ModelLayer";
import {RegisterBodyType} from "@/schemas/auth.schema";
import {RoleEnum} from "@/enums";
import { CustomTableData } from '@/interfaces/table';
import { usePaginate } from '@/hooks';
import { MetaPaginate } from '@/interfaces';

export default function MemberManagement() {
    const {toast} = useToast()
    const searchParams = useSearchParams()
    const type = searchParams.get('type') ?? ''
    const {userAuth} = useSelector((state: RootState) => state.auth)
    const [data, setData] = useState<CustomTableData>({
      columns: [],
      values: [],
    })
    const [meta, setMeta] = useState<MetaPaginate>({ totalPages: 1, currentPage: 1, limit: 10 });
    const { handlePrevPage, handleNextPage, handleClickPage } = usePaginate({
      meta,
      setMetaCallback: setMeta,
    });
    const [createFormState, setCreateFormState] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    const searchFields = "username, email"
    const toggleCreateFormState = () => setCreateFormState(prev => !prev)

    const fetchUsersByTypeAndQuery = async (type: string, searchQuery: string, searchFields: string) => {
      try {
        const resData = (await axiosInstance.get(
          '/users',
          {
            params: {
              type: +type,
              page: meta.currentPage,
              limit: meta.limit,
              queryString: searchQuery,
              searchFields,
            }
          }
        )).data;

        resData?.values?.find((user: { id: string; disableCheck: boolean; }) => {
          if (userAuth && user.id === userAuth['userId']) {
            user.disableCheck = true;
            return true;
          }
          return false;
        });

        setData({
            columns: resData.columns,
            values: resData.values,
        });

        setMeta({
            ...meta,
            currentPage: resData.meta.currentPage,
            totalPages: resData.meta.totalPages,
        })
      } catch (e) {
        toast({
          title: "Xảy ra lỗi khi lấy thông tin",
          variant: 'destructive',
        })
      }
    };

    const handleCreateUserForm = async (values: RegisterBodyType) => {
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

          const resData = (await axiosInstance.post<any>('/auth/register', {...values})).data;

          if (resData.status === HttpStatusCode.Created) {
              toast({
                  title: "Tạo tài khoản thành công",
                  variant: "success",
              });

              setCreateFormState(false);
              setData(prev => ({
                ...prev,
                values: [...prev.values, {...resData.data, disableCheck: false}]
              }));
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

    useEffect(() => {
      fetchUsersByTypeAndQuery(type, searchQuery, searchFields);
    }, [type, searchQuery, meta.currentPage]);

    return (
      <div>
        <PageBreadcrumb pageTitle={RoleEnum[+type].charAt(0).toUpperCase() + RoleEnum[+type].slice(1)}/>
        
        <div className='space-y-6'>
          <CustomTable
            tableTitle={''}
            tableData={data}
            createItem={true}
            detailItem={true}
            deleteItem={true}
            search={true}
            handleCreate={toggleCreateFormState}
            handleDetail={(userSelected) => console.log(userSelected)}
            handleDelete={async (userSelected) => await console.log(userSelected)}    // Test event
            handleSearch={(query) => setSearchQuery(query)}
          />
        </div>

        <CustomPagination
          currentPage={meta.currentPage}
          totalPages={meta.totalPages}
          handlePreviousPage={handlePrevPage}
          handleNextPage={handleNextPage}
          handleClickPage={handleClickPage}
        />

        <ModelLayer
            isOpen={createFormState}
            onClose={() => setCreateFormState(false)}
            maxWidth="max-w-3xl"
        >
            <CreateNewAccountForm
                onSubmit={(values: RegisterBodyType) => handleCreateUserForm(values)}
            />
        </ModelLayer>
      </div>
    )
}