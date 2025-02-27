import { EntityManager } from "typeorm";
import { seedRoles } from "./factories/index";
import { logColors } from "@/utils/logColors";

export const seedDatabase = async(manager: EntityManager): Promise<void> => { 
    try {
        console.log(logColors.brightBlue, 'Seeding roles...');
        await seedRoles(manager);

        console.log(logColors.brightYellow, 'Seeding completed successfully!');
    } catch (error) {
        console.error(logColors.brightRed, 'Error during seeding:', error);
    } finally {
        console.log(logColors.green, 'Database connection for seeding data is closed.');
    }
}