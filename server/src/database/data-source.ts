import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Action } from '@/modules/actions/entities/action.entity';
import { Cart } from '@/modules/carts/entities/cart.entity';
import { CartDetail } from '@/modules/cart_details/entities/cart_detail.entity';
import { CompleteCourse } from '@/modules/complete_courses/entities/complete_course.entity';
import { CompleteLession } from '@/modules/complete_lessions/entities/complete_lession.entity';
import { CompleteModule } from '@/modules/complete_modules/entities/complete_module.entity';
import { Course } from '@/modules/courses/entities/course.entity';
import { ImagesCourse } from '@/modules/images_course/entities/images_course.entity';
import { LessionsCourse } from '@/modules/lessions_course/entities/lessions_course.entity';
import { ModulesCourse } from '@/modules/modules_course/entities/modules_course.entity';
import { Role } from '@/modules/roles/entities/role.entity';
import { Session } from '@/modules/sessions/entities/session.entity';
import { SocialAccount } from '@/modules/social_accounts/entities/social_account.entity';
import { User } from '@/modules/users/entities/user.entity';
import { Voucher } from '@/modules/vouchers/entities/voucher.entity';
import { Video } from '@/modules/videos/entities/video.entity';

dotenv.config({ path: '.env.development' });

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    entities: [
        Action,
        Cart,
        CartDetail,
        CompleteCourse,
        CompleteLession,
        CompleteModule,
        Course,
        ImagesCourse,
        LessionsCourse,
        ModulesCourse,
        Role,
        Session,
        SocialAccount,
        User,
        Voucher,
        Video,
    ],
    migrations: ['src/database/migrations/*{.ts,.js}'],
    migrationsTableName: 'migrations_table',
    synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;
