/*
export enum RoleEnum {
    Admin = 1,
    Staff = 2,
    Teacher = 3,
    Student = 4,
}

*/

import { RoleEnum } from "@/enums";

export const ROLE_LABELS: Partial<Record<keyof typeof RoleEnum, string>> = {
  Admin: 'Quản trị viên',
  Staff: 'Nhân viên',
  Teacher: 'Giáo viên',
  Student: 'Học sinh',
}