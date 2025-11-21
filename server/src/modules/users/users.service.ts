import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import {
  In,
  Repository,
  UpdateResult,
  DataSource,
  DeleteResult,
} from 'typeorm';
import { ResetPasswordDTO } from '@/modules/auth/dto/forgot-password.dto';
import { hashPassword } from '@/utils/bcrypt';
import { Role } from '@/modules/roles/entities/role.entity';
import { TableMetaData } from '@/interfaces/table';
import { getDataWithQueryAndPaginate } from '@/utils/paginateAndSearch';
import { GetDataWithQueryParamsDTO } from '@/dto';
import { GenderEnum, RoleEnum } from '@/database/enums';
import { validateAndGetEntitiesByIds } from '@/utils/validateAndGetEntitiesByIds';
import { UpdateUserProfileDTO } from '@/modules/users/dto';
import { deleteFile } from '@/utils/handleFiles';
import { enumValidation } from '@/utils/enumValidation';

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
        { key: 'username', displayName: 'Tên tài khoản', type: 'string' },
        { key: 'fullname', displayName: 'Tên người dùng', type: 'string' },
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
      where: { role: role },
    });
  }

  async getAdditionUserData(userId: number) {
    try {
      return await this.userRepository.findOne({
        where: { id: userId },
        select: ['address', 'phone_number', 'role_id', 'gender'],
      });
    } catch (error) {
      throw new BadRequestException(
        'Tìm thông tin tài khoản thất bại: ' + error.message,
      );
    }
  }

  async updateProfile(
    data: UpdateUserProfileDTO,
    avatar_url: string,
  ): Promise<User> {
    try {
      console.log('Data receive: ', data);

      const {
        username,
        email,
        fullname,
        address,
        gender,
        phone_number,
        role_id,
      } = data;
      const user = await this.userRepository.findOneBy({ username });

      if (!user)
        throw new NotFoundException('Không tìm thấy thông tin người dùng');

      user.email = email;
      user.fullname = fullname;
      user.address = address;
      user.phone_number = phone_number;

      if (enumValidation(GenderEnum, +gender)) user.gender = +gender;
      if (enumValidation(RoleEnum, +role_id)) user.role_id = +role_id;

      if (avatar_url) {
        await deleteFile(user.avatar_url);
        user.avatar_url = avatar_url;
      }

      user.updated_at = new Date();
      return await this.userRepository.save(user);
    } catch (error) {
      await deleteFile(avatar_url);
      throw new BadRequestException(
        'Cập nhật thông tin tài khoản thất bại: ' + error.message,
      );
    }
  }

  async softDeleteUsers(userIds: string[]): Promise<UpdateResult> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await validateAndGetEntitiesByIds(this.userRepository, userIds);
      const softDeleteUsersResult = await queryRunner.manager.update(
        User,
        {
          id: In(userIds),
        },
        {
          deleted_at: Date(),
        },
      );

      await queryRunner.commitTransaction();
      return softDeleteUsersResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'Xoá danh sách tài khoản thất bại: ' + error.message,
      );
    } finally {
      await queryRunner.release();
    }
  }

  async forceDeleteUsers(userIds: string[]): Promise<DeleteResult> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await validateAndGetEntitiesByIds(this.userRepository, userIds);
      const deleteUsersResult = await queryRunner.manager.delete(User, {
        id: In(userIds),
      });

      // Delete user avatars here!!!!

      // ----------------------------

      await queryRunner.commitTransaction();
      return deleteUsersResult;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(
        'Xoá danh sách tài khoản thất bại: ' + error.message,
      );
    } finally {
      await queryRunner.release();
    }
  }
}
