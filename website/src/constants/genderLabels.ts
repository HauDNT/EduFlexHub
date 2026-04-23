import { GenderEnum } from "@/enums";

export const GENDER_LABELS: Partial<Record<keyof typeof GenderEnum, string>> = {
  Male: 'Nam',
  Female: 'Nữ',
  Other: 'Khác'
}