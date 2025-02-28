import {Module} from '@nestjs/common';
import {SessionsService} from './sessions.service';
import {SessionsController} from './sessions.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {Session} from "@/modules/sessions/entities/session.entity";
import {User} from "@/modules/users/entities/user.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([Session, User]),
    ],
    controllers: [SessionsController],
    providers: [SessionsService]
})
export class SessionsModule {
}
