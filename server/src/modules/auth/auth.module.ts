import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JWTStrategy } from '@/authentication/jwt/jwt-strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from '../users/users.module';
import { GoogleStrategy } from '@/authentication/google_oauth2/google-strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        TypeOrmModule.forFeature([User]),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('secret_key'),
                signOptions: {
                    expiresIn: '1d',
                }
            }),
            inject: [ConfigService],
        }),
        UsersModule,
        PassportModule.register({ 
            defaultStrategy: 'google',
            session: true,
        }),
    ],
    controllers: [AuthController],
    providers: [
        AuthService,
        JWTStrategy,
        GoogleStrategy,
    ],
})
export class AuthModule { }
