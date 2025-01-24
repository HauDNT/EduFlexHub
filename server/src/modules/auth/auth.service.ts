import {
    BadRequestException,
    HttpException,
    Injectable,
    InternalServerErrorException,
    UnauthorizedException
} from '@nestjs/common';
import {User} from '../users/entities/user.entity';
import {InjectRepository} from '@nestjs/typeorm';
import {DataSource, Repository} from 'typeorm';
import {JwtService} from '@nestjs/jwt';
import {UserLoginDTO} from './dto/login-account.dto';
import {UserLoginResponseDTO} from './dto/login-response.dto';
import {UserLoginPayload} from '@/authentication/jwt/jwt-payload.type';
import {SocialAccount} from "@/modules/social_accounts/entities/social_account.entity";
import {ExceptionHandler} from "@nestjs/core/errors/exception-handler";
import {RegisterDTO} from "@/modules/auth/dto/register.dto";
import {comparePassword, hashPassword} from "@/utils/bcrypt";
import {RegisterResponseDTO} from "@/modules/auth/dto/register-response";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(SocialAccount)
        private socialAccountRepository: Repository<SocialAccount>,
        private jwtService: JwtService,
        private dataSource: DataSource,
    ) {
    };

    // --------------------------------------------------- Local account ---------------------------------------------------
    async userLogin(account: UserLoginDTO): Promise<UserLoginResponseDTO> {
        if (!account || !account.username || !account.password) {
            throw new BadRequestException('Thông tin đăng nhập không hợp lệ')
        }

        try {
            const user = await this.userRepository.findOneBy({
                username: account.username,
            });

            if (!user) {
                throw new UnauthorizedException('Tài khoản không tồn tại')
            }

            const isPasswordValid: boolean = await comparePassword(account.password, user.password);

            if (!isPasswordValid) {
                throw new UnauthorizedException('Mật khẩu không trùng khớp')
            }

            const payload: UserLoginPayload = {
                userId: user.id,
                username: user.username
            };

            return {
                userId: user.id,
                username: user.username,
                accessToken: this.jwtService.sign(payload),
            };
        } catch (e) {
            console.log(`Lỗi đăng nhập: ${e.message}`)

            if (e instanceof HttpException) {
                throw e;
            }

            throw new InternalServerErrorException('Xảy ra lỗi từ phía server trong quá trình đăng nhập');
        }
    };

    async userRegister(data: RegisterDTO): Promise<RegisterResponseDTO> {
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            if (!data || !data.username || !data.password || !data.re_password) {
                throw new BadRequestException('Thông tin đăng ký không hợp lệ')
            }

            const {username, password, re_password} = data;
            const existUser = await this.userRepository.findOneBy({username});

            if (existUser) {
                throw new BadRequestException('Tên tài khoản đã tồn tại')
            }

            if (password !== re_password) {
                throw new BadRequestException('Mật khẩu không trùng khớp')
            }

            const hash_password = await hashPassword(password)

            await queryRunner.manager.save(User, {
                username: username,
                password: hash_password,
                fullname: '',
                email: '',
                address: '',
                phone_number: '',
                address_device: '',
            });

            await queryRunner.commitTransaction();

            return {
                status: 201,
                message: 'Đăng ký thành công',
            }
        } catch (e) {
            await queryRunner.rollbackTransaction();

            console.log(`Lỗi đăng ký: ${e.message}`)

            if (e instanceof HttpException) {
                throw e;
            }

            throw new InternalServerErrorException('Đã xảy ra lỗi ở phía server trong quá trình đăng ký tài khoản');
        } finally {
            await queryRunner.release();
        }
    }

    async updateOTPVerifyAccount(user: User, verifyCode: string): Promise<any> {
        const otpCreatedAt = new Date();
        const updateOTPAccount = await this.userRepository.save({
                ...user,
                code_expires: verifyCode,
                expires_at: new Date(otpCreatedAt.getTime() + 5 * 60000),
                updated_at: new Date(),
            }
        );

        return !!updateOTPAccount;
    }

    // --------------------------------------------------- Login - Google OAuth ---------------------------------------------------
    serializeUser(user: any, done: Function) {
        done(null, user.id);
    }

    deserializeUser(id: string, done: Function) {
        const user = this.userRepository.findOneBy({id: +id})
        done(null, user)
    }

    async accessWithGoogle(user: any): Promise<UserLoginResponseDTO> {
        const parseUser = JSON.parse(user);

        try {
            // Check account with email exists?
            const existsUser = await this.userRepository.findOneBy({
                email: parseUser.email
            });

            existsUser !== null ?
                await this.updateLoginSocialAccount(existsUser.id, parseUser) :
                await this.savedNewSocialAccountData(parseUser);

            const payload: UserLoginPayload = {
                userId: parseUser.id,
                email: parseUser.email,
                provider_token: parseUser.accessToken,
            }

            return {
                userId: parseUser.id,
                username: parseUser.email,
                accessToken: this.jwtService.sign(payload),
            }
        } catch (e) {
            console.log('--> Xảy ra lỗi trong quá trình đăng nhập với tài khoản Google: ', e);
            throw new ExceptionHandler();
        }
    }

    // --------------------------------------------------- Handle with data of social account response ---------------------------------------------------
    async savedNewSocialAccountData(parseJSONData: any): Promise<boolean> {
        const queryRunner = this.dataSource.createQueryRunner();

        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            if (parseJSONData) {
                const saveUser: User = await queryRunner.manager.save(User, {
                    username: '',
                    password: '',
                    fullname: parseJSONData.fullname,
                    email: parseJSONData.email,
                    address: '',
                    phone_number: '',
                    address_device: '',
                });

                const saveSocialAccount: SocialAccount = await queryRunner.manager.save(SocialAccount, {
                    provider: parseJSONData.provider,
                    provider_token: parseJSONData.accessToken,
                    user_id: saveUser.id,
                });

                if (saveUser && saveSocialAccount) {
                    await queryRunner.commitTransaction();
                    return true;
                }
            }

            return false;
        } catch (e) {
            await queryRunner.rollbackTransaction();
            throw new ExceptionHandler();
        } finally {
            await queryRunner.release()
        }
    }

    async updateLoginSocialAccount(existsUserId: number, socialData: any): Promise<boolean> {
        try {
            const updateResult = await this.socialAccountRepository.update(existsUserId, {
                provider: socialData.provider,
                provider_token: socialData.accessToken,
            });

            return !!updateResult;
        } catch (e) {
            console.log('--> Xảy ra lỗi trong quá trình lưu phiên đăng nhập mới từ tài khoản Google: ', e);
            throw new ExceptionHandler();
        }
    }
}
