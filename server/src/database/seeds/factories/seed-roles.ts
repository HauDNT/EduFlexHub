import { EntityManager } from "typeorm";
import { logColors } from "@/utils/logColors";
import {Role} from "@/modules/roles/entities/role.entity";
import {RoleEnum} from "@/database/enums/RoleEnum";

export const seedRoles = async (manager: EntityManager): Promise<void> => {
    // Xóa dữ liệu cũ
    await manager.getRepository(Role).delete({});

    const roleCount = Object.keys(RoleEnum).length / 2;
    for (let i = 0; i < roleCount; i++) {
        const role: Role = {
            id: i,
            name: RoleEnum[i],
            users: [],
            actions: [],
        };

        await manager.getRepository(Role).save(role);
        console.log(logColors.brightCyan, `-> Role with name ${RoleEnum[i]} and was created`);
    }

    console.log(logColors.brightYellow, `==> All ${roleCount} roles seeded successfully!`);
}