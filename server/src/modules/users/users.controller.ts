import {BadRequestException, Body, Controller, Delete, Get, Query} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from "@/modules/users/entities/user.entity";
import {TableMetaData} from "@/interfaces/table";
import {DeleteUsersDTO} from "@/modules/users/dto";
import {UpdateResult} from "typeorm";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get()
    async getByType(
        @Query('type') type: string,
        @Query('page') page: number,
        @Query('limit') limit: number,
    ): Promise<TableMetaData<User>> {
        if (!['admin', 'staff', 'student', 'teacher'].includes(type)) {
            throw new BadRequestException({
                message: 'Loại tài khoản không hợp lệ',
                status: 400,
            })
        }

        return await this.usersService.getAllMembersByTypeQuery(type, { page, limit })
    }

    @Delete('/delete-users')
    async deleteUsers(
        @Body() data: DeleteUsersDTO
    ): Promise<UpdateResult> {
        const { userItemIds } = data
        return await this.usersService.softDeleteUsers(userItemIds);
    }
}
