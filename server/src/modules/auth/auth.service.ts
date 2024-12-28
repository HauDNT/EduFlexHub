import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from './dto/login-account.dto';
import { UserLoginResponseDTO } from './dto/login-response.dto';
import { UserLoginPayload } from '@/authentication/jwt/jwt-payload.type';
import { SocialAccount } from "@/modules/social_accounts/entities/social_account.entity";
import { ExceptionHandler } from "@nestjs/core/errors/exception-handler";

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        @InjectRepository(SocialAccount)
        private socialAccountRepository: Repository<SocialAccount>,
        private jwtService: JwtService,
        private dataSource: DataSource,
    ) { };

    // --------------------------------------------------- Login - local account ---------------------------------------------------
    async userLogin(account: UserLoginDTO): Promise<UserLoginResponseDTO> {
        const user = await this.userRepository.findOneBy({
            username: account.username,
            password: account.password,
        });

        if (!user) {
            throw new UnauthorizedException();
        } else {
            const payload: UserLoginPayload = { userId: user.id, username: user.username };

            return {
                userId: user.id,
                username: user.username,
                accessToken: this.jwtService.sign(payload),
            }
        }
    };

    // --------------------------------------------------- Login - Google OAuth ---------------------------------------------------
    serializeUser(user: any, done: Function) {
        done(null, user.id);
    }

    deserializeUser(id: string, done: Function) {
        const user = this.userRepository.findOneBy({ id: +id })
        done(null, user)
    }

    async savedSocialData(user: any): Promise<boolean> {
        const parseUser = JSON.parse(user);
        const queryRunner = this.dataSource.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            // Check account with email exists?
            const isExist = await this.userRepository.findOneBy({
                email: parseUser.email
            });

            if (!isExist) {
                // Save user social account
                const saveUser: User = await queryRunner.manager.save(User, {
                    username: '',
                    password: '',
                    fullname: parseUser.fullname,
                    email: parseUser.email,
                    address: '',
                    phone_number: '',
                    address_device: '',
                });

                const saveSocialAccount: SocialAccount = await queryRunner.manager.save(SocialAccount, {
                    provider: parseUser.provider,
                    provider_token: parseUser.accessToken,
                    user_id: saveUser.id,
                });

                if (saveUser && saveSocialAccount) {
                    await queryRunner.commitTransaction();
                    return true;
                }
            }

            return true;
        } catch (e) {
            console.log('--> Error when login with social account: ', e);
            await queryRunner.rollbackTransaction();
            throw new ExceptionHandler();
        } finally {
            await queryRunner.release()
        }
    }
}
