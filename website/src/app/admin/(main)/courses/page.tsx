'use client'
import { useEffect, useState } from "react";
import { CustomTableData, MetaPaginate } from "@/interfaces";
import CustomTable from "@/components/table/CustomTable"
import PageBreadcrumb from "@/components/common/PageBreadCrumb"
import CustomPagination from "@/components/common/CustomPagination"
import { useFetchResource, usePaginate } from "@/hooks";

export default function CoursesManagement() {
  const [meta, setMeta] = useState<MetaPaginate>({ totalPages: 1, currentPage: 1, limit: 10 });
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState<CustomTableData>({
    columns: [],
    values: [],
  })
  const { data: cachedData } = useFetchResource({
    resource: 'courses',
    page: meta.currentPage,
    limit: meta.limit,
    queryString: searchQuery,
    searchFields: "name",
  })
  const { handlePrevPage, handleNextPage, handleClickPage } = usePaginate({
    meta,
    setMetaCallback: setMeta,
  })

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
  }, [cachedData]);

  return (
    <div>
      <PageBreadcrumb pageTitle='Quản lý khoá học' />

      <div className="space-y-6">
        <CustomTable
          tableTitle={'Danh sách khoá học'}
          tableData={data}
          createItem={true}
          detailItem={true}
          deleteItem={true}
          navigateToRestore={true}
          search={true}
          handleCreate={() => { }}
          handleDetail={(courseSelected) => { }}
          handleNavigateToRestore={() => { }}
          handleDelete={async (courseSelected) => { }}
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