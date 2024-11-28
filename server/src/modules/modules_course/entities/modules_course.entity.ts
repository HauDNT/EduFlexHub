import { CompleteModule } from "@/modules/complete_modules/entities/complete_module.entity";
import { Course } from "@/modules/courses/entities/course.entity";
import { LessionsCourse } from "@/modules/lessions_course/entities/lessions_course.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'modules_course' })
export class ModulesCourse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'text' })
    description: string;

    // modules of course
    @ManyToOne(() => Course, course => course.modules_course)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    // module has many lessions
    @OneToMany(() => LessionsCourse, lessions_course => lessions_course.each_module)
    lessions_course: LessionsCourse[];

    // Complete modules
    @OneToMany(() => CompleteModule, complete_modules => complete_modules.module)
    complete_modules: CompleteModule[];
}
