'use client'
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";
import { handleAxiosError } from "@/utils/axiosInstance";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomTable from "@/components/table/CustomTable";
import CustomPagination from "@/components/common/CustomPagination";
import CreateNewAccountForm from "@/components/forms/CreateNewAccountForm";
import ModelLayer from "@/components/common/ModelLayer";
import { RegisterBodyType } from "@/schemas/auth.schema";
import { RoleEnum } from "@/enums";
import { CustomTableData } from '@/interfaces/table';
import { usePaginate } from '@/hooks';
import { MetaPaginate } from '@/interfaces';
import { useFetchResource } from '@/hooks/useFetchResource';
import { useCreateResource } from '@/hooks/useCreateResource';

export default function MemberManagement() {
  const { toast } = useToast()
  const searchParams = useSearchParams()
  const type = searchParams.get('type') ?? ''
  const [meta, setMeta] = useState<MetaPaginate>({ totalPages: 1, currentPage: 1, limit: 10 });
  const [searchQuery, setSearchQuery] = useState("")
  const searchFields = "username, email"
  const [data, setData] = useState<CustomTableData>({
    columns: [],
    values: [],
  })
  const { data: cachedData } = useFetchResource({
    resource: 'users',
    page: meta.currentPage,
    limit: meta.limit,
    queryString: searchQuery,
    searchFields,
    type: +type,
  })
  const { handlePrevPage, handleNextPage, handleClickPage } = usePaginate({
    meta,
    setMetaCallback: setMeta,
  })
  const [createFormState, setCreateFormState] = useState(false)
  const toggleCreateFormState = () => setCreateFormState(prev => !prev)

  const handleCreateNewUser = useCreateResource(
    'users',
    'json',
    () => {
      toast({ title: 'Tạo tài khoản thành công', variant: 'success' });
      setCreateFormState(false);
    },
    (error) => {
      toast({
        title: 'Tạo tài khoản thất bại',
        description: handleAxiosError(error),
        variant: 'destructive',
      });
    },
  )

  useEffect(() => {
    if (cachedData) {
      setData({
        columns: cachedData.columns,
        values: cachedData.values,
      });

      setMeta((prev) => ({
        ...prev,
        totalPages: cachedData.meta.totalPages,
        currentPage: cachedData.meta.currentPage,
      }));
    }
  }, [cachedData, type]);

  return (
    <div>
      <PageBreadcrumb pageTitle={RoleEnum[+type].charAt(0).toUpperCase() + RoleEnum[+type].slice(1)} />

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
          onSubmit={(values: RegisterBodyType) => handleCreateNewUser.mutateAsync(values)}
        />
      </ModelLayer>
    </div>
  )
}