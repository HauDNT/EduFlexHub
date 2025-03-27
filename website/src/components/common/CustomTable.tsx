import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/table";
import {CustomTableProps} from "@/interfaces/table";
import {renderCellValues} from "@/utils/customTableUtils";

export default function CustomTable({
    tableData,
    onSort,
    classname
}: CustomTableProps) {
    const { columns, values } = tableData;

    return (
        <div
            className={`${classname} overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]`}>
            <div className="max-w-full overflow-x-auto">
                <div className="min-w-[1102px]">
                    <Table>
                        {/* Table Header */}
                        <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                            <TableRow>
                                {
                                    columns.map((col) => (
                                        <TableCell
                                            key={col.key}
                                            isHeader
                                            onClick={() => onSort?.(col.key)}
                                            className="px-5 py-3 font-medium text-black-500 text-center text-theme-sm dark:text-gray-400"
                                        >
                                            {col.displayName}
                                        </TableCell>
                                    ))
                                }
                            </TableRow>
                        </TableHeader>

                        {/* Table Body */}
                        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                            {values.map((row, index) => (
                                <TableRow key={index}>
                                    {
                                        columns.map((col) => (
                                            <TableCell key={col.key} className="px-5 py-4 sm:px-6 text-center">
                                                <div className="flex items-center gap-3">
                                                    <div className={'w-full'}>
                                                        <span className="block text-gray-500 text-center text-theme-sm">
                                                            {
                                                                col.key === 'is_online' ?
                                                                (
                                                                    <div className={'w-100 flex justify-center'}>
                                                                        {
                                                                            row[col.key] === true ? (
                                                                                <span className={`absolute h-2 w-2 rounded-full bg-green-400 flex`} >
                                                                                    <span className="absolute inline-flex w-full h-full bg-green-400 rounded-full opacity-75 animate-ping"/>
                                                                                </span>
                                                                            ) : (
                                                                                <span className="relative h-2 w-2 rounded-full bg-red-400 flex items-center justify-center">
                                                                                    <span className="inline-flex w-full h-full bg-red-400 rounded-full opacity-75 animate-ping"/>
                                                                                </span>
                                                                            )
                                                                        }
                                                                    </div>
                                                                ) : (
                                                                    <span>
                                                                        {renderCellValues(col, row[col.key])}
                                                                    </span>
                                                                )
                                                            }
                                                        </span>
                                                    </div>
                                                </div>
                                            </TableCell>
                                        ))
                                    }
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
