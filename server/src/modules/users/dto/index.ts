import {IsArray, IsNotEmpty, IsString, IsOptional, IsInt, Min, IsEnum} from 'class-validator';
import { Type } from 'class-transformer';
import {RoleEnum} from "@/database/enums/RoleEnum";

export class DeleteUsersDTO {
    @IsArray()
    @IsNotEmpty({ message: 'User list id is not empty' })
    userItemIds: string[];
}

export class GetUsersDTO {
    @IsOptional()
    @IsString()
    queryString?: string;

    @IsOptional()
    @IsString()
    searchFields?: string;      // Chuỗi dạng "username,email"

    @IsOptional()
    @IsEnum(RoleEnum)
    type?: RoleEnum;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit?: number = 10;
}

export class DeleteUserDto {
    @IsArray()
    @IsNotEmpty({ message: 'Danh sách id tài khoản người dùng không hợp lệ' })
    userIds: string[];
}