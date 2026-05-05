import { GenderEnum } from "@/enums";
import { CustomTableColumn } from "@/interfaces/table"

type Formatter = (value: any, col?: CustomTableColumn) => string;

const formatters: Record<string, Formatter> = {
  boolean: (value) => (value ? "Có" : "Không"),

  number: (value) =>
    value !== undefined && value !== null ? value.toString() : "-",

  date: (value) => {
    if (!value) return "-";

    const date = new Date(value);
    if (isNaN(date.getTime())) return "-";

    return date.toLocaleString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  },

  gender: (value) => {
    switch (parseInt(value)) {
      case GenderEnum.Male: return "Nam";
      case GenderEnum.Female: return "Nữ";
      case GenderEnum.Other: return "Khác";
      default: return "Không xác định";
    }
  },

  string: (value, col) => {
    if (!value) return "-";

    const str = value.toString();
    const maxLength = col?.maxLength || 100;

    return str.length > maxLength
      ? str.slice(0, maxLength) + "..."
      : str;
  },
};

export const renderCellValues = (
  col: CustomTableColumn,
  value: any
): string => {

  if (col.valueMapping) {
    const key = value?.toString() ?? "-";
    return col.valueMapping[key] || key;
  }

  const formatter = formatters[col.type || "string"];

  return formatter ? formatter(value, col) : value?.toString() || "-";
};