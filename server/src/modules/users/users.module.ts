import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {UsersController} from './users.controller';
import {TypeOrmModule} from '@nestjs/typeorm';
import {User} from './entities/user.entity';
import {Role} from "@/modules/roles/entities/role.entity";
import { AuthModule } from '@/modules/auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([User, Role]),
        AuthModule,
    ],
    controllers: [UsersController],
    providers: [UsersService],
})
export class UsersModule {
}
