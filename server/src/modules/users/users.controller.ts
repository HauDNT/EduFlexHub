import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import * as fs from 'fs/promises';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';
import { User } from '@/modules/users/entities/user.entity';
import { TableMetaData } from '@/interfaces/table';
import { DeleteUserDto, UpdateUserProfileDTO } from '@/modules/users/dto';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RoleEnum } from '@/database/enums';
import { RegisterDTO } from '@/modules/auth/dto/register.dto';
import { RegisterResponseDTO } from '@/modules/auth/dto/register-response';
import AuthService from '@/modules/auth/auth.service';
import { FileInterceptor } from '@nestjs/platform-express';

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

  @Get('/addition-data')
  async getAdditionUserData(@Query('id') userId: number): Promise<any> {
    return await this.usersService.getAdditionUserData(userId);
  }

  @Post('/create')
  async createUser(@Body() data: RegisterDTO): Promise<RegisterResponseDTO> {
    return this.authService.registerAccount(data);
  }

  @Put('/update-profile')
  @UseInterceptors(
    FileInterceptor('avatar', {
      storage: diskStorage({
        destination: async (req, file, callback) => {
          const uploadPath = '/uploads/images/avatars';
          try {
            await fs.mkdir(uploadPath, { recursive: true });
            callback(null, uploadPath);
          } catch (error) {
            callback(
              new Error(
                'Không thể tạo thư mục lưu trữ ảnh đại diện người dùng',
              ),
              null,
            );
          }
        },
        filename(
          req,
          file: Express.Multer.File,
          callback: (error: Error | null, filename: string) => void,
        ) {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(new Error('Chỉ chấp nhận file ảnh!'), false);
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  async updateProfile(
    @UploadedFile() file: Express.Multer.File,
    @Body() data: UpdateUserProfileDTO,
  ): Promise<any> {
    let avatar_url = null;
    if (file) avatar_url = `/uploads/images/avatars/${file.filename}`;

    return await this.usersService.updateProfile(data, avatar_url);
  }

  @Delete('/soft-delete')
  async softDeleteUsers(@Body() data: DeleteUserDto): Promise<UpdateResult> {
    const { userIds } = data;
    return await this.usersService.softDeleteUsers(userIds);
  }

  @Delete('/force-delete')
  async deleteUsers(@Body() data: DeleteUserDto): Promise<DeleteResult> {
    const { userIds } = data;
    return await this.usersService.forceDeleteUsers(userIds);
  }
}
