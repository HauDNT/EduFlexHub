'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { handleAxiosError } from "@/utils/axiosInstance";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import CustomTable from "@/components/table/CustomTable";
import CustomPagination from "@/components/common/CustomPagination";
import { useToast, usePaginate, useFetchResource, useRestoreResource } from '@/hooks';
import { CustomTableData, MetaPaginate } from '@/interfaces';
import { RoleEnum } from '@/enums';

export default function MemberRestore() {
  const router = useRouter();
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
    isRestoreFetch: true,
  })
  const { handlePrevPage, handleNextPage, handleClickPage } = usePaginate({
    meta,
    setMetaCallback: setMeta,
  })

  const handleRestoreUsers = useRestoreResource(
    'users',
    'userIds',
    () => {
      toast({
        title: `Đã khôi phục tài khoản người dùng thành công`,
        variant: 'success',
      });
    },
    (error) => {
      toast({
        title: 'Khôi phục tài khoản người dùng thất bại',
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
          deleteItem={true}
          restoreItem={true}
          search={true}
          handleRestore={async (userSelected) => handleRestoreUsers.mutateAsync(userSelected)}
          handleDelete={async (userSelected) => console.log(userSelected)}
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
    </div>
  )
}