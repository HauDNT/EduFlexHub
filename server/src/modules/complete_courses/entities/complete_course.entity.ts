import { User } from "@/modules/users/entities/user.entity";
import { Course } from "@/modules/courses/entities/course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'complete_courses' })
export class CompleteCourse {
    @PrimaryColumn()
    course_id: number;

    @PrimaryColumn()
    student_account_id: number;

    @Column({ type: 'datetime' })
    completed_at: Date;

    @ManyToOne(() => Course, course => course.complete_course)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @ManyToOne(() => User, student => student.complete_course)
    @JoinColumn({ name: 'student_account_id' })
    student: User;
}
