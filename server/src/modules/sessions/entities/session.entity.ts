import { User } from "@/modules/users/entities/user.entity";
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

    @ManyToOne(() => User, user => user.sessions)
    @JoinColumn({ name: 'account_id' })
    user: User;
}
