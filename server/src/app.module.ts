import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from '@/config/configuration';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';

import { UsersModule } from '@/modules/users/users.module';
import { typeOrmAsyncConfig } from '@/database/typeorm-config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SocialAccountsModule } from './modules/social_accounts/social_accounts.module';
import { RolesModule } from './modules/roles/roles.module';
import { ActionsModule } from './modules/actions/actions.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { CoursesModule } from './modules/courses/courses.module';
import { ModulesCourseModule } from './modules/modules_course/modules_course.module';
import { LessionsCourseModule } from './modules/lessions_course/lessions_course.module';
import { VideosModule } from './modules/videos/videos.module';
import { ImagesCourseModule } from './modules/images_course/images_course.module';
import { CompleteCoursesModule } from './modules/complete_courses/complete_courses.module';
import { CompleteModulesModule } from './modules/complete_modules/complete_modules.module';
import { CompleteLessionsModule } from './modules/complete_lessions/complete_lessions.module';
import { CartsModule } from './modules/carts/carts.module';
import { CartDetailsModule } from './modules/cart_details/cart_details.module';
import { VouchersModule } from './modules/vouchers/vouchers.module';
import { LoggerMiddleware } from './middleware/LoggerMiddleware';
import { AuthModule } from './modules/auth/auth.module';
import {APP_FILTER} from "@nestjs/core";
import { MailModule } from './modules/mail/mail.module';
import {SeedModule} from "@/database/seeds/seed.module";
import { AllExceptionsFilter } from '@/config/AllExceptionsFilter';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: [
                '.env.development',
                '.env.production',
            ],
            load: [configuration]
        }),
        TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
        UsersModule,
        SocialAccountsModule,
        RolesModule,
        ActionsModule,
        SessionsModule,
        CoursesModule,
        ModulesCourseModule,
        LessionsCourseModule,
        VideosModule,
        ImagesCourseModule,
        CompleteCoursesModule,
        CompleteModulesModule,
        CompleteLessionsModule,
        CartsModule,
        CartDetailsModule,
        VouchersModule,
        AuthModule,
        MailModule,
        SeedModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_FILTER,
            useClass: AllExceptionsFilter,
        },
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
