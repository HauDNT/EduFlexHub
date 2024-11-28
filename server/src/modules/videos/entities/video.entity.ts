import { LessionsCourse } from "@/modules/lessions_course/entities/lessions_course.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'videos' })
export class Video {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    video_url: string;

    @Column({ type: 'text' })
    thumbnail_url: string;

    @ManyToMany(() => LessionsCourse, lessions_course => lessions_course.videos)
    @JoinTable({
        name: 'lession_video',
        joinColumn: {
            name: 'video_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'lession_id',
            referencedColumnName: 'id',
        },
    })
    lessions: LessionsCourse[];
}
