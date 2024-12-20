import { Cart } from "@/modules/carts/entities/cart.entity";
import { CompleteCourse } from "@/modules/complete_courses/entities/complete_course.entity";
import { CompleteLession } from "@/modules/complete_lessions/entities/complete_lession.entity";
import { CompleteModule } from "@/modules/complete_modules/entities/complete_module.entity";
import { Course } from "@/modules/courses/entities/course.entity";
import { Role } from "@/modules/roles/entities/role.entity";
import { Session } from "@/modules/sessions/entities/session.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true})
    fullname: string;

    @Column({ default: 3 })
    gender: number;

    @Column({ nullable: true})
    address: string;

    @Column({ nullable: true})
    phone_number: string;

    @Column()
    address_device: string;

    @Column({ default: false })
    is_online: boolean;

    @Column({ default: false })
    is_active: boolean;

    @Column()
    code_expired: string;

    @Column({ default: false })
    is_2auth: boolean;

    @Column({ nullable: true })
    token_2auth: string;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    // role
    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role_id: Role;

    // sessions
    @OneToMany(() => Session, session => session.user)
    sessions: Session[];

    // teach <-> courses
    @OneToMany(() => Course, course => course.teacher)
    courses: Course[];

    // student save courses
    @ManyToMany(() => Course, course => course.student_save)
    @JoinTable({
        name: 'student_save_course', // Tên bảng trung gian
        joinColumn: {
            name: 'course_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'student_id',
            referencedColumnName: 'id',
        },
    })
    courses_saved: Course[];

    // Student complete course
    @OneToMany(() => CompleteCourse, complete_course => complete_course.student)
    complete_course: CompleteCourse[];

    // Student complete module
    @OneToMany(() => CompleteModule, complete_modules => complete_modules.student)
    complete_modules: CompleteModule[];

    // Student complete module
    @OneToMany(() => CompleteLession, complete_lessions => complete_lessions.student)
    complete_lessions: CompleteLession[];

    // Own cart
    @OneToMany(() => Cart, cart => cart.account)
    own_cart: Cart[];
}
