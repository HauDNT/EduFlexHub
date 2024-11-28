import { Cart } from "@/modules/carts/entities/cart.entity";
import { Course } from "@/modules/courses/entities/course.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cart_details' })
export class CartDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Cart, cart => cart.details)
    @JoinColumn({ name: 'cart_id' })
    cart: Cart;

    @ManyToOne(() => Course, course => course.course_in_cart)
    @JoinColumn({ name: 'course_id' })
    course: Course;

    @Column({ type: 'double' })
    price_save: number;

    @Column({ type: 'datetime' })
    created_at: Date | null;

    @Column({ type: 'datetime' })
    updated_at: Date | null;
}
