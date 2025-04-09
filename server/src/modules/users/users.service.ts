import {HttpException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {In, Repository, UpdateResult, IsNull, Like} from 'typeorm';
import {ResetPasswordDTO} from "@/modules/auth/dto/forgot-password.dto";
import {hashPassword} from "@/utils/bcrypt";
import {RoleEnum} from "@/database/enums/RoleEnum";
import {Role} from "@/modules/roles/entities/role.entity";
import {TableMetaData} from "@/interfaces/table";
import {PaginationQueryDTO} from "@/utils/PaginationQueryDTO";
import {GetUsersDTO} from "@/modules/users/dto";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(Role)
        private roleRepository: Repository<Role>,
    ) {
    }

    async findById(userId: number): Promise<User> {
        return await this.userRepository.findOneBy({id: userId});
    }

    async findByEmail(userEmail: string): Promise<User> {
        return await this.userRepository.findOneBy({email: userEmail});
    }

    async changePassword(data: ResetPasswordDTO) {
        const {email, password, re_password} = data;
        try {
            const user = await this.findByEmail(email);

            if (!user) {
                throw new UnauthorizedException('Tài khoản không tồn tại')
            }

            if (password !== re_password) {
                throw new UnauthorizedException('Mật khẩu không trùng khớp')
            }

            const hashedPassword = await hashPassword(data.password)

            return await this.userRepository.save({
                ...user,
                password: hashedPassword,
            })
        } catch (e) {
            console.log('Reset password error: ', e.message);

            if (e instanceof HttpException) {
                throw e;
            }

            throw new InternalServerErrorException('Xảy ra lỗi từ phía server trong quá trình tạo mật khẩu mới');
        }
    }

    async getUsersByTypeAndQuery(data: GetUsersDTO): Promise<TableMetaData<User>> {
        const {
            type,
            page,
            limit,
            queryString,
            searchFields,
        } = data;

        const role = await this.roleRepository.findOneBy(
            {id: type}
        )

        // Tính skip và take
        /*
            page = 1 => skip = 0
            page = 2 => skip = limit
            page = 3 => skip = 2 * limit
         */
        const skip = (page - 1) * limit
        const take = limit

        // Tạo điều kiện cho queryString
        const where: any = {};
        where.role_id = role
        where.deleted_at = IsNull()

        console.log('Query string: ' + queryString)
        console.log('Search fields: ' + searchFields)

        // Xử lý tìm kiếm trên nhiều trường
        let searchConditions: any[] = [];
        if (queryString && searchFields) {
            const fields = searchFields.split(',').map((field) => field.trim());
            searchConditions = fields.map((field) => ({
                ...where,
                [field]: Like(`%${queryString}%`),
            }));
        }

        console.log(searchConditions.length)

        const [users, total] = await this.userRepository.findAndCount({
            where: searchConditions.length > 0 ? searchConditions : where,
            select: ['id', 'username', 'fullname', 'email', 'gender', 'is_online', 'is_active'],
            skip,
            take,
        })

        // Tính tổng số trang
        const totalPages = Math.ceil(total / limit);

        return {
            "columns": [
                {"key": "id", "displayName": "ID", "type": "number"},
                {"key": "username", "displayName": "Tên người dùng", "type": "string"},
                {"key": "email", "displayName": "Email", "type": "string"},
                {
                    "key": "gender",
                    "displayName": "Giới tính",
                    "type": "number",
                    "valueMapping": {
                        1: "Nam",
                        2: "Nữ",
                        3: "Không xác định"
                    },
                },
                {
                    "key": "is_online",
                    "displayName": "Trạng thái online",
                    "type": "boolean",
                    "valueMapping": {
                        "true": "Đang online",
                        "false": "Offline"
                    },
                },
            ],
            "values": users,
            "meta": {
                "totalItems": total,
                "currentPage": page,
                "totalPages": totalPages,
                "limit": limit,
            }
        }
    }

    // async searchMembers(type: string, queryString: string, searchFields: string[]) {
    //     let roleNumber = 0
    //
    //     switch (type) {
    //         case 'admin':
    //             roleNumber = RoleEnum.Admin
    //             break
    //         case 'staff':
    //             roleNumber = RoleEnum.Staff
    //             break
    //         case 'student':
    //             roleNumber = RoleEnum.Student
    //             break
    //         case 'teacher':
    //             roleNumber = RoleEnum.Teacher
    //             break
    //     }
    //
    //     const role = await this.roleRepository.findOneBy(
    //         {id: roleNumber}
    //     )
    // }

    async softDeleteUsers(userItemIds: string[]): Promise<UpdateResult> {
        try {
            return this.userRepository.update(
                { id: In(userItemIds) },
                { is_online: false, deleted_at: new Date() },
            )
        } catch (e) {
            console.log('Error when soft delete users: ', e.message);

            if (e instanceof HttpException) {
                throw e;
            }

            throw new InternalServerErrorException('Xảy ra lỗi từ phía server trong quá trình xoá người dùng');
        }
    }
}
