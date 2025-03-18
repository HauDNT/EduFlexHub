import React from "react";

const BestSellCourses: React.FC = () => {
    return (
        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6">
            <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
                    Khoá học bán chạy (Hoàn thiện khi có dữ liệu)
                </h3>
            </div>
        </div>
    )
}

export default BestSellCourses