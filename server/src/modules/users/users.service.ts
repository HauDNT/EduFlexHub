import {
    BadRequestException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Repository} from 'typeorm';
import {EmailDTO, ResetPasswordDTO} from "@/modules/auth/dto/forgot-password.dto";
import {hashPassword} from "@/utils/bcrypt";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async findById(userId: number): Promise<User> {
        return await this.userRepository.findOneBy({id: userId});
    }

    async findByEmail(userEmail: string): Promise<User> {
        return await this.userRepository.findOneBy({email: userEmail});
    }

    async changePassword(data: ResetPasswordDTO) {
        const { email, password, re_password } = data;
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
}
