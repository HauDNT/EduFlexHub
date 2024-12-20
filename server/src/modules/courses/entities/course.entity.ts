import { User } from "@/modules/users/entities/user.entity";
import { CartDetail } from "@/modules/cart_details/entities/cart_detail.entity";
import { CompleteCourse } from "@/modules/complete_courses/entities/complete_course.entity";
import { ImagesCourse } from "@/modules/images_course/entities/images_course.entity";
import { ModulesCourse } from "@/modules/modules_course/entities/modules_course.entity";
import { Voucher } from "@/modules/vouchers/entities/voucher.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'courses' })
export class Course {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ type: 'time' })
    duration: Date;

    @Column()
    description: string;
    
    @Column({ type: 'double' })
    price: number;

    @Column({ type: 'text' })
    thumbail_url: string;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    // teacher
    @ManyToOne(() => User, account => account.courses)
    @JoinColumn({ name: 'teacher_id' })
    teacher: User;

    // course has many modules
    @OneToMany(() => ModulesCourse, modules_course => modules_course.course)
    modules_course: ModulesCourse[];

    // Course's images
    @OneToMany(() => ImagesCourse, images => images.course)
    images: ImagesCourse[];

    // Course was saved by student
    @ManyToMany(() => User, student => student.courses_saved)
    student_save: User[];

    // Complete course
    @OneToMany(() => CompleteCourse, complete_course => complete_course.course)
    complete_course: CompleteCourse[];

    // Course in cart
    @OneToMany(() => CartDetail, details => details.course)
    course_in_cart: CartDetail[];

    // Course apply vouchers
    @OneToMany(() => Voucher, voucher => voucher.course)
    apply_voucher: Voucher[];
}
