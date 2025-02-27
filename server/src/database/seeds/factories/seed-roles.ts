import { EntityManager } from "typeorm";
import * as bcrypt from "bcrypt";
import { logColors } from "@/utils/logColors";
import {Role} from "@/modules/roles/entities/role.entity";
import {RoleEnum} from "@/database/enums/RoleEnum";

export const seedRoles = async (manager: EntityManager, numOfRecords: number = 2): Promise<void> => {
    for (let i = 0; i <= numOfRecords; i++) {
        const role: Role = {
            id: i,
            name: RoleEnum[i],
            users: [],
            actions: [],
        };

        await manager.getRepository(Role).save(role);

        console.log(logColors.brightCyan, `-> Role with name ${RoleEnum[i]} and was created`);
    }

    console.log(logColors.brightYellow, `==> All ${numOfRecords} roles seeded successfully!`);
}