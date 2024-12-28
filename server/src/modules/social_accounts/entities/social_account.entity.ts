import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@/modules/users/entities/user.entity";

@Entity({ name: 'social_accounts' })
export class SocialAccount {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    provider: string;

    @Column()
    provider_token: string;

    @OneToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user_id: number;
}
