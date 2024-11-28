import { Account } from "@/modules/accounts/entities/account.entity";
import { CartDetail } from "@/modules/cart_details/entities/cart_detail.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'carts' })
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'double' })
    total_price: number;

    @Column()
    status: boolean;

    @Column({ type: 'datetime' })
    created_at: Date | null;

    @Column({ type: 'datetime' })
    updated_at: Date | null;

    @ManyToOne(() => Account, account => account.own_cart)
    @JoinColumn({ name: 'account_id' })
    account: Account;

    @OneToMany(() => CartDetail, details => details.cart)
    details: CartDetail[];
}
