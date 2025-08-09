import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@/modules/users/entities/user.entity';
import { TableMetaData } from '@/interfaces/table';
import { DeleteUserDto, DeleteUsersDTO } from '@/modules/users/dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RoleEnum } from '@/database/enums/RoleEnum';
import { RegisterDTO } from '@/modules/auth/dto/register.dto';
import { RegisterResponseDTO } from '@/modules/auth/dto/register-response';
import { AuthService } from '@/modules/auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
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
      });
    }

    return await this.usersService.getUsersByTypeAndQuery(
      { page, limit, queryString, searchFields },
      type,
    );
  }

  @Post('/create')
  async createUser(@Body() data: RegisterDTO): Promise<RegisterResponseDTO> {
    return this.authService.registerAccount(data);
  }

  // @Delete('/delete-users')
  // async deleteUsers(
  //     @Body() data: DeleteUsersDTO
  // ): Promise<UpdateResult> {
  //     const { userItemIds } = data
  //     return await this.usersService.softDeleteUsers(userItemIds);
  // }

  @Delete('/delete')
  async deleteUsers(@Body() data: DeleteUserDto): Promise<DeleteResult> {
    const { userIds } = data;
    return await this.usersService.forceDeleteUsers(userIds);
  }
}
