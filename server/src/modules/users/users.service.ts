import {
  HttpException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {
  In,
  Repository,
  UpdateResult,
  IsNull,
  Like,
  DataSource,
} from 'typeorm';
import { ResetPasswordDTO } from '@/modules/auth/dto/forgot-password.dto';
import { hashPassword } from '@/utils/bcrypt';
import { Role } from '@/modules/roles/entities/role.entity';
import { TableMetaData } from '@/interfaces/table';
import { getDataWithQueryAndPaginate } from '@/utils/paginateAndSearch';
import { GetDataWithQueryParamsDTO } from '@/dto';
import { RoleEnum } from '@/database/enums/RoleEnum';
import { validateAndGetEntitiesByIds } from '@/utils/validateAndGetEntitiesByIds';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    private readonly dataSource: DataSource,
  ) {}

  async findById(userId: number): Promise<User> {
    return await this.userRepository.findOneBy({ id: userId });
  }

  async findByEmail(userEmail: string): Promise<User> {
    return await this.userRepository.findOneBy({ email: userEmail });
  }

  async changePassword(data: ResetPasswordDTO) {
    const { email, password, re_password } = data;
    try {
      const user = await this.findByEmail(email);

      if (!user) {
        throw new UnauthorizedException('Tài khoản không tồn tại');
      }

      if (password !== re_password) {
        throw new UnauthorizedException('Mật khẩu không trùng khớp');
      }

      const hashedPassword = await hashPassword(data.password);

      return await this.userRepository.save({
        ...user,
        password: hashedPassword,
      });
    } catch (e) {
      console.log('Reset password error: ', e.message);

      if (e instanceof HttpException) {
        throw e;
      }

      throw new InternalServerErrorException(
        'Xảy ra lỗi từ phía server trong quá trình tạo mật khẩu mới',
      );
    }
  }

  async getUsersByTypeAndQuery(
    data: GetDataWithQueryParamsDTO,
    type: RoleEnum,
  ): Promise<TableMetaData<User>> {
    const { page, limit, queryString, searchFields } = data;
    const role = await this.roleRepository.findOneBy({ id: type });

    if (!role) {
      throw new UnauthorizedException('Loại tài khoản không hợp lệ');
    }

    return await getDataWithQueryAndPaginate<User>({
      repository: this.userRepository,
      page,
      limit,
      queryString,
      searchFields: searchFields ? searchFields.split(',') : [],
      selectFields: [
        'id',
        'username',
        'fullname',
        'email',
        'gender',
        'is_online',
      ],
      columnsMeta: [
        { key: 'id', displayName: 'ID', type: 'number' },
        { key: 'username', displayName: 'Tên người dùng', type: 'string' },
        { key: 'email', displayName: 'Email', type: 'string' },
        {
          key: 'gender',
          displayName: 'Giới tính',
          type: 'number',
          valueMapping: {
            1: 'Nam',
            2: 'Nữ',
            3: 'Không xác định',
          },
        },
        {
          key: 'is_online',
          displayName: 'Trạng thái online',
          type: 'boolean',
          valueMapping: {
            true: 'Đang online',
            false: 'Offline',
          },
        },
      ],
      where: { role_id: role },
    });
  }

  // async softDeleteUsers(userItemIds: string[]): Promise<UpdateResult> {
  //   try {
  //     return this.userRepository.update(
  //       { id: In(userItemIds) },
  //       { is_online: false, deleted_at: new Date() },
  //     );
  //   } catch (e) {
  //     if (e instanceof HttpException) {
  //       throw e;
  //     }

  //     throw new InternalServerErrorException(
  //       'Xảy ra lỗi từ phía server trong quá trình xoá người dùng',
  //     );
  //   }
  // }

  async forceDeleteUsers(userIds: string[]): Promise<any> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const users = await validateAndGetEntitiesByIds(
        this.userRepository,
        userIds,
      );

      const deleteUsersResult = await queryRunner.manager.delete(User, {
        id: In(userIds),
      });

      // Delete user avatars here!!!!


      // ----------------------------

      await queryRunner.commitTransaction();
      return deleteUsersResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException('Xoá danh sách tài khoản thất bại: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }
}
