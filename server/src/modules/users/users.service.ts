import {HttpException, Injectable, InternalServerErrorException, UnauthorizedException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {ResetPasswordDTO} from "@/modules/auth/dto/forgot-password.dto";
import {hashPassword} from "@/utils/bcrypt";
import {RoleEnum} from "@/database/enums/RoleEnum";
import {Role} from "@/modules/roles/entities/role.entity";
import {TableMetaData} from "@/interfaces/table";

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

    async getAllMembersByTypeQuery(type: string): Promise<TableMetaData<User>> {
        let roleNumber = 0

        switch (type) {
            case 'admin':
                roleNumber = RoleEnum.Admin
                break
            case 'staff':
                roleNumber = RoleEnum.Staff
                break
            case 'student':
                roleNumber = RoleEnum.Student
                break
            case 'teacher':
                roleNumber = RoleEnum.Teacher
                break
        }

        const role = await this.roleRepository.findOneBy(
            {id: roleNumber}
        )

        const users = await this.userRepository.find({
            where: {role_id: role},
            select: ['id', 'username', 'fullname', 'email', 'gender', 'is_online', 'is_active'],
        })

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
            "values": users
        }
    }
}
