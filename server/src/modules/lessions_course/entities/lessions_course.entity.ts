import { CompleteLession } from "@/modules/complete_lessions/entities/complete_lession.entity";
import { ModulesCourse } from "@/modules/modules_course/entities/modules_course.entity";
import { Video } from "@/modules/videos/entities/video.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'lessions_course' })
export class LessionsCourse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ type: 'time' })
    duration: Date;

    @Column({ type: 'text' })
    description: string;

    // Lessons belongs to modules
    @ManyToOne(() => ModulesCourse, modules_course => modules_course.lessions_course)
    @JoinColumn({ name: 'module_id' })
    each_module: ModulesCourse;

    // Lesson's video
    @ManyToMany(() => Video, video => video.lessions)
    videos: Video[];

    // Complete lession
    @OneToMany(() => CompleteLession, complete_lessions => complete_lessions.lession)
    complete_lessions: CompleteLession[];
}
