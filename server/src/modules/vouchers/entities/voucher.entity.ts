import { Course } from "@/modules/courses/entities/course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'vouchers'})
export class Voucher {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50})
    code: string;

    @Column({ type: 'varchar', length: 10})
    value: string;

    @Column({ type: 'double' })
    price_applied: number;

    @Column()
    status: boolean;

    @ManyToOne(() => Course, course => course.apply_voucher)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column({ type: 'datetime' })
    created_at: Date | null;

    @Column({ type: 'datetime' })
    updated_at: Date | null;
}
