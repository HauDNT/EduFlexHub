import {IsArray, IsNotEmpty, IsString } from 'class-validator';

export class DeleteUsersDTO {
    @IsArray()
    @IsNotEmpty({ message: 'User list id is not empty' })
    userItemIds: string[];
}
