import {BadRequestException, Controller, Get, Query} from '@nestjs/common';
import {UsersService} from './users.service';
import {User} from "@/modules/users/entities/user.entity";

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) {}

    @Get()
    async getByType(@Query('type') type: string): Promise<User[]> {
        if (type !== 'admin' && type !== 'staff' && type !== 'student' && type !== 'teacher') {
            throw new BadRequestException({
                message: 'Loại tài khoản không hợp lệ',
                status: 400,
            })
        }

        return await this.usersService.getAllMembersByTypeQuery(type)
    }
}
