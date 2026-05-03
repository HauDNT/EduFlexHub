'use client'

import { useState } from "react";
import { MetaPaginate } from "@/interfaces";
import CustomTable from "@/components/table/CustomTable"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import CustomPagination from "@/components/common/CustomPagination"
import { usePaginate } from "@/hooks";
import { CoursesMock } from "@/mock/course";

export default function CoursesManagement() {
  const [meta, setMeta] = useState<MetaPaginate>({ totalPages: 1, currentPage: 1, limit: 10 });
  const { handlePrevPage, handleNextPage, handleClickPage } = usePaginate({
    meta,
    setMetaCallback: setMeta,
  })

  return (
    <div>
      <PageBreadcrumb pageTitle='Quản lý khoá học' />

      <div className="space-y-6">
        <CustomTable
          tableTitle={''}
          tableData={
            {
              columns: [
                { key: 'id', displayName: 'ID', type: 'number' },
                { key: 'name', displayName: 'Tên khoá học', type: 'string' },
                { key: 'duration', displayName: 'Thời lượng', type: 'number' },
                { key: 'description', displayName: 'Mô tả', type: 'string' },
                { key: 'price', displayName: 'Giá', type: 'string' },
                { key: 'created_at', displayName: 'Ngày tạo', type: 'string' },
                { key: 'updated_at', displayName: 'Ngày cập nhật', type: 'string' },
              ],
              values: CoursesMock
            }
          }
          createItem={false}
          detailItem={false}
          deleteItem={false}
          navigateToRestore={false}
          search={false}
          handleCreate={() => { }}
          handleDetail={(userSelected) => { }}
          handleNavigateToRestore={() => { }}
          handleDelete={async (userSelected) => { }}
          handleSearch={(query) => { }}
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