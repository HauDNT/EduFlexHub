import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserLoginDTO } from './dto/login-account.dto';
import { UserLoginResponseDTO } from './dto/login-response.dto';
import { UserLoginPayload } from '@/authentication/jwt/jwt-payload.type';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private jwtService: JwtService,
    ) { };

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

    serializeUser(user: any, done: Function) {
        done(null, user.id);
    }

    deserializeUser(id: string, done: Function) {
        const user = this.userRepository.findOneBy({ id: +id })
        done(null, user);
    }
}
