import { Course } from "@/modules/courses/entities/course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'images_course' })
export class ImagesCourse {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    image_url: string;

    @ManyToOne(() => Course, course => course.images)
    @JoinColumn({ name: 'course_id' })
    course: Course;
}
