import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "@/modules/users/entities/user.entity";
import { Action } from "@/modules/actions/entities/action.entity";
import { Admin } from "@/modules/admins/entities/admin.entity";

@Entity({ name: 'roles' })
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => User, user => user.role_id)
    users: User[];

    @OneToMany(() => Admin, admin => admin.role_id)
    admins: Admin[];

    @ManyToMany(() => Action, action => action.roles)
    @JoinTable({
        name: 'role_action', // Tên bảng trung gian
        joinColumn: {
            name: 'role_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'action_id',
            referencedColumnName: 'id',
        },
    })
    actions: Action[];
}
