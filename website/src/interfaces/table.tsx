import React, {ReactNode} from "react";

// Props for Table
export interface TableProps {
    children: ReactNode; // Table content (thead, tbody, etc.)
    className?: string; // Optional className for styling
}

// Props for TableHeader
export interface TableHeaderProps {
    children: ReactNode; // Header row(s)
    className?: string; // Optional className for styling
}

// Props for TableBody
export interface TableBodyProps {
    children: ReactNode; // Body row(s)
    className?: string; // Optional className for styling
}

// Props for TableRow
export interface TableRowProps {
    children: ReactNode; // Cells (th or td)
    className?: string; // Optional className for styling
}

// Props for TableCell
export interface TableCellProps {
    children: ReactNode; // Cell content
    key?: number;       // Key for map loop
    isHeader?: boolean; // If true, renders as <th>, otherwise <td>
    className?: string; // Optional className for styling
    onClick?: void;
}

// // Column and data
// interface TableColumn {
//     key: string;
//     title: string;
//     sortable?: boolean;
//     filterable?: boolean;
// }
//
// interface TableRowData {
//     [key: string]: any;
// }

// Table Props
export interface CustomTableProps extends TableProps {
    columns: { key: string; label: string; sortable?: boolean }[]; // Định nghĩa các cột
    data: any[]; // Dữ liệu của bảng
    onSort?: (key: string) => void; // Hàm xử lý sắp xếp
}