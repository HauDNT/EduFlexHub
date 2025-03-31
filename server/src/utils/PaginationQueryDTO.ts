import { IsNumber, IsOptional } from 'class-validator';
import {Transform} from 'class-transformer';

export class PaginationQueryDTO {
    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : 1)) // Mặc định là 1 nếu không có
    @IsNumber()
    page: number = 1;

    @IsOptional()
    @Transform(({ value }) => (value ? parseInt(value, 10) : 10)) // Mặc định là 10 nếu không có
    @IsNumber()
    limit: number = 10;
}