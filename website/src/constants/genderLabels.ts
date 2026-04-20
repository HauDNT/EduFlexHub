import { Gender } from "@/enums";

export const GENDER_LABELS: Partial<Record<keyof typeof Gender, string>> = {
  Male: 'Nam',
  Female: 'Nữ',
  Other: 'Khác'
}