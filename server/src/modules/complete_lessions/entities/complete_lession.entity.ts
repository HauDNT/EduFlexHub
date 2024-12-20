import { User } from "@/modules/users/entities/user.entity";
import { LessionsCourse } from "@/modules/lessions_course/entities/lessions_course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'complete_lessions'})
export class CompleteLession {
    @PrimaryColumn()
    module_id: number;

    @PrimaryColumn()
    student_account_id: number;

    @Column({ type: 'datetime' })
    completed_at: Date;

    @ManyToOne(() => LessionsCourse, lessions => lessions.complete_lessions)
    @JoinColumn({ name: 'lession_id' })
    lession: LessionsCourse;

    @ManyToOne(() => User, student => student.complete_lessions)
    @JoinColumn({ name: 'student_account_id' })
    student: User;
}
