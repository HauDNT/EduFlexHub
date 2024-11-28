import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "@/modules/accounts/entities/account.entity";

@Entity({ name: 'social_accounts' })
export class SocialAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    provider: string;

    @Column()
    provider_token: string;

    @OneToOne(() => Account)
    @JoinColumn({ name: 'account_id' })
    account: Account;
}
