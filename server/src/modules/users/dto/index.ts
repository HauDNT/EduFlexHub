import {
  IsArray,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsInt,
  Min,
  IsEnum,
  Length,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { RoleEnum } from '@/database/enums';

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
  searchFields?: string;

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

export class UpdateUserProfileDTO {
  // @IsString({ message: 'Mã tài khoản không hợp lệ' })
  // @IsNotEmpty({ message: 'Mã tài khoản không được bỏ trống' })
  // @Transform(({ value }) => String(value))
  // id: string;

  @IsString({ message: 'Tên tài khoản không hợp lệ' })
  @IsNotEmpty({ message: 'Tên tài khoản không hợp lệ' })
  @Transform(({ value }) => String(value))
  username: string;

  @IsString({ message: 'Họ và tên không hợp lệ' })
  @IsNotEmpty({ message: 'Họ và tên không hợp lệ' })
  @Transform(({ value }) => String(value))
  fullname: string;

  @IsString({ message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không hợp lệ' })
  @Transform(({ value }) => String(value))
  email: string;

  @IsString({ message: 'Địa chỉ không hợp lệ' })
  @IsNotEmpty({ message: 'Địa chỉ không hợp lệ' })
  @Transform(({ value }) => String(value))
  address: string;

  @IsString({ message: 'Số điện thoại không hợp lệ' })
  @IsNotEmpty({ message: 'Số điện thoại không hợp lệ' })
  @Transform(({ value }) => String(value))
  phone_number: string;

  @IsString({ message: 'Giới tính không hợp lệ' })
  @IsNotEmpty({ message: 'Giới tính không hợp lệ' })
  @Length(1, 1, { message: 'Giới tính không hợp lệ' })
  @Transform(({ value }) => String(value))
  gender: string;

  @IsString({ message: 'Loại tài khoản không hợp lệ' })
  @IsNotEmpty({ message: 'Loại tài khoản không hợp lệ' })
  @Length(1, 1, { message: 'Loại tài khoản không hợp lệ' })
  @Transform(({ value }) => String(value))
  role_id: string;
}

export class DeleteUserDto {
  @IsArray()
  @IsNotEmpty({ message: 'Danh sách id tài khoản người dùng không hợp lệ' })
  userIds: string[];
}
