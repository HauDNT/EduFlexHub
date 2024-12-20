import { Role } from "@/modules/roles/entities/role.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'admins' })
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;

    @Column({ nullable: true })
    fullname: string;

    @Column({ nullable: true })
    phone_number: string;

    @Column({ default: false })
    is_online: boolean;

    @Column({ default: false })
    is_active: boolean;

    @Column({ type: 'timestamp', nullable: true })
    created_at: Date | null;

    @Column({ type: 'timestamp', nullable: true })
    updated_at: Date | null;

    // role
    @ManyToOne(() => Role, role => role.users)
    @JoinColumn({ name: 'role_id' })
    role_id: Role;
}
