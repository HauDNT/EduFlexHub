import { User } from "@/modules/users/entities/user.entity";
import { ModulesCourse } from "@/modules/modules_course/entities/modules_course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'complete_modules' })
export class CompleteModule {
    @PrimaryColumn()
    module_id: number;

    @PrimaryColumn()
    student_account_id: number;

    @Column({ type: 'datetime' })
    completed_at: Date;

    @ManyToOne(() => ModulesCourse, modules => modules.complete_modules)
    @JoinColumn({ name: 'module_id' })
    module: ModulesCourse;

    @ManyToOne(() => User, student => student.complete_modules)
    @JoinColumn({ name: 'student_account_id' })
    student: User;
}
