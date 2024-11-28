import { Account } from "@/modules/accounts/entities/account.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'sessions' })
export class Session {
    @PrimaryGeneratedColumn()
    session_id: number;

    @Column()
    device_ip: string;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    @ManyToOne(() => Account, account => account.sessions)
    @JoinColumn({ name: 'account_id' })
    account: Account;
}
