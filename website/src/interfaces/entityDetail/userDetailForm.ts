export interface UserDetailFormInterface {
    id: number;
    username: string;
    email: string;
    fullname: string;
    address?: string;
    phone_number?: string;
    role_id?: string | number;
    gender: string | number;
    avatar?: File;
}