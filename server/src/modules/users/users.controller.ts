import {BadRequestException, Body, Controller, Delete, Get, Post, Query} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from "@/modules/users/entities/user.entity";
import {TableMetaData} from "@/interfaces/table";
import {DeleteUsersDTO} from "@/modules/users/dto";
import {UpdateResult} from "typeorm";
import {RoleEnum} from "@/database/enums/RoleEnum";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get()
    async getUsersByTypeAndQuery(
        @Query('type') type: RoleEnum,
        @Query('page') page: number,
        @Query('limit') limit: number,
        @Query('queryString') queryString: string,
        @Query('searchFields') searchFields: string,
    ): Promise<TableMetaData<User>> {
        if (!Object.values(RoleEnum).includes(type)) {
            throw new BadRequestException({
                message: 'Loại tài khoản không hợp lệ',
                status: 400,
            })
        }

        return await this.usersService.getUsersByTypeAndQuery({type, page, limit, queryString, searchFields})
    }
    
    @Delete('/delete-users')
    async deleteUsers(
        @Body() data: DeleteUsersDTO
    ): Promise<UpdateResult> {
        const { userItemIds } = data
        return await this.usersService.softDeleteUsers(userItemIds);
    }
}
