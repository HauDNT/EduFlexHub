import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1740458156199 implements MigrationInterface {
    name = 'SchemaUpdate1740458156199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`cart_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`price_save\` double NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, \`cart_id\` int NULL, \`course_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`carts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`total_price\` double NOT NULL, \`status\` tinyint NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, \`user_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`complete_courses\` (\`course_id\` int NOT NULL, \`student_account_id\` int NOT NULL, \`completed_at\` datetime NOT NULL, PRIMARY KEY (\`course_id\`, \`student_account_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`complete_modules\` (\`module_id\` int NOT NULL, \`student_account_id\` int NOT NULL, \`completed_at\` datetime NOT NULL, PRIMARY KEY (\`module_id\`, \`student_account_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`modules_course\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`description\` text NOT NULL, \`course_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`videos\` (\`id\` int NOT NULL AUTO_INCREMENT, \`video_url\` text NOT NULL, \`thumbnail_url\` text NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lessions_course\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`duration\` time NOT NULL, \`description\` text NOT NULL, \`module_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`complete_lessions\` (\`module_id\` int NOT NULL, \`student_account_id\` int NOT NULL, \`completed_at\` datetime NOT NULL, \`lession_id\` int NULL, PRIMARY KEY (\`module_id\`, \`student_account_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`actions\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`roles\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`sessions\` (\`session_id\` int NOT NULL AUTO_INCREMENT, \`device_ip\` varchar(255) NOT NULL, \`created_at\` timestamp NULL, \`updated_at\` timestamp NULL, \`account_id\` int NULL, PRIMARY KEY (\`session_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`fullname\` varchar(255) NULL, \`gender\` int NOT NULL DEFAULT '3', \`address\` varchar(255) NULL, \`phone_number\` varchar(255) NULL, \`address_device\` varchar(255) NOT NULL, \`is_online\` tinyint NOT NULL DEFAULT 0, \`is_active\` tinyint NOT NULL DEFAULT 0, \`code_expires\` varchar(255) NOT NULL DEFAULT '', \`expires_at\` timestamp NULL, \`is_2auth\` tinyint NOT NULL DEFAULT 0, \`token_2auth\` varchar(255) NULL, \`created_at\` timestamp NULL, \`updated_at\` timestamp NULL, \`role_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`images_course\` (\`id\` int NOT NULL AUTO_INCREMENT, \`image_url\` text NOT NULL, \`course_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courses\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`duration\` time NOT NULL, \`description\` varchar(255) NOT NULL, \`price\` double NOT NULL, \`thumbail_url\` text NOT NULL, \`created_at\` timestamp NULL, \`updated_at\` timestamp NULL, \`teacher_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vouchers\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(50) NOT NULL, \`value\` varchar(10) NOT NULL, \`price_applied\` double NOT NULL, \`status\` tinyint NOT NULL, \`created_at\` datetime NOT NULL, \`updated_at\` datetime NOT NULL, \`course_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`social_accounts\` (\`id\` int NOT NULL AUTO_INCREMENT, \`provider\` varchar(255) NOT NULL, \`provider_token\` varchar(255) NOT NULL, \`user_id\` int NULL, UNIQUE INDEX \`REL_05a0f282d3bed93ca048a7e54d\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lession_video\` (\`video_id\` int NOT NULL, \`lession_id\` int NOT NULL, INDEX \`IDX_2c1d69a6da676702826c2f883c\` (\`video_id\`), INDEX \`IDX_0ae481f2e0f919e059c1448739\` (\`lession_id\`), PRIMARY KEY (\`video_id\`, \`lession_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`role_action\` (\`role_id\` int NOT NULL, \`action_id\` int NOT NULL, INDEX \`IDX_f39cfd766e4b1a93e105c2fd67\` (\`role_id\`), INDEX \`IDX_db06d82a57d7c9fb7dd36f5a63\` (\`action_id\`), PRIMARY KEY (\`role_id\`, \`action_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`student_save_course\` (\`course_id\` int NOT NULL, \`student_id\` int NOT NULL, INDEX \`IDX_5b9395d253d5a209e5d0a47416\` (\`course_id\`), INDEX \`IDX_97ed8ec54f080edfff333138f5\` (\`student_id\`), PRIMARY KEY (\`course_id\`, \`student_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`cart_details\` ADD CONSTRAINT \`FK_c81e3af806614bbf45024de3ca4\` FOREIGN KEY (\`cart_id\`) REFERENCES \`carts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart_details\` ADD CONSTRAINT \`FK_d8ee94ee444c3e0fc26d0707fbe\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`carts\` ADD CONSTRAINT \`FK_2ec1c94a977b940d85a4f498aea\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`complete_courses\` ADD CONSTRAINT \`FK_ec03919a03a645c9325cdadea13\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`complete_courses\` ADD CONSTRAINT \`FK_fe055f8392ad33fbab8a35bf4be\` FOREIGN KEY (\`student_account_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`complete_modules\` ADD CONSTRAINT \`FK_00b328356d513fc0fcda77e0d54\` FOREIGN KEY (\`module_id\`) REFERENCES \`modules_course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`complete_modules\` ADD CONSTRAINT \`FK_c841398f0b64d7e2ec9b759d01f\` FOREIGN KEY (\`student_account_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`modules_course\` ADD CONSTRAINT \`FK_de74e529342eda5189426aa4539\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lessions_course\` ADD CONSTRAINT \`FK_cbbdadd1a634cb81831ce8fa9cc\` FOREIGN KEY (\`module_id\`) REFERENCES \`modules_course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`complete_lessions\` ADD CONSTRAINT \`FK_78a1215b181ae27b589a539ddce\` FOREIGN KEY (\`lession_id\`) REFERENCES \`lessions_course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`complete_lessions\` ADD CONSTRAINT \`FK_c8bac3e89b332a729cc27cfa74c\` FOREIGN KEY (\`student_account_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`sessions\` ADD CONSTRAINT \`FK_da0cf19646ff5c6e3c0284468e5\` FOREIGN KEY (\`account_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD CONSTRAINT \`FK_a2cecd1a3531c0b041e29ba46e1\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`images_course\` ADD CONSTRAINT \`FK_65aa5f077a99c7ce5b6247155de\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_fad76a730ee7f68d0a59652fb12\` FOREIGN KEY (\`teacher_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vouchers\` ADD CONSTRAINT \`FK_ce9231e17481985ee3350a5db73\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`social_accounts\` ADD CONSTRAINT \`FK_05a0f282d3bed93ca048a7e54dd\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lession_video\` ADD CONSTRAINT \`FK_2c1d69a6da676702826c2f883c8\` FOREIGN KEY (\`video_id\`) REFERENCES \`videos\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`lession_video\` ADD CONSTRAINT \`FK_0ae481f2e0f919e059c14487394\` FOREIGN KEY (\`lession_id\`) REFERENCES \`lessions_course\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`role_action\` ADD CONSTRAINT \`FK_f39cfd766e4b1a93e105c2fd675\` FOREIGN KEY (\`role_id\`) REFERENCES \`roles\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`role_action\` ADD CONSTRAINT \`FK_db06d82a57d7c9fb7dd36f5a631\` FOREIGN KEY (\`action_id\`) REFERENCES \`actions\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`student_save_course\` ADD CONSTRAINT \`FK_5b9395d253d5a209e5d0a474163\` FOREIGN KEY (\`course_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`student_save_course\` ADD CONSTRAINT \`FK_97ed8ec54f080edfff333138f5e\` FOREIGN KEY (\`student_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`student_save_course\` DROP FOREIGN KEY \`FK_97ed8ec54f080edfff333138f5e\``);
        await queryRunner.query(`ALTER TABLE \`student_save_course\` DROP FOREIGN KEY \`FK_5b9395d253d5a209e5d0a474163\``);
        await queryRunner.query(`ALTER TABLE \`role_action\` DROP FOREIGN KEY \`FK_db06d82a57d7c9fb7dd36f5a631\``);
        await queryRunner.query(`ALTER TABLE \`role_action\` DROP FOREIGN KEY \`FK_f39cfd766e4b1a93e105c2fd675\``);
        await queryRunner.query(`ALTER TABLE \`lession_video\` DROP FOREIGN KEY \`FK_0ae481f2e0f919e059c14487394\``);
        await queryRunner.query(`ALTER TABLE \`lession_video\` DROP FOREIGN KEY \`FK_2c1d69a6da676702826c2f883c8\``);
        await queryRunner.query(`ALTER TABLE \`social_accounts\` DROP FOREIGN KEY \`FK_05a0f282d3bed93ca048a7e54dd\``);
        await queryRunner.query(`ALTER TABLE \`vouchers\` DROP FOREIGN KEY \`FK_ce9231e17481985ee3350a5db73\``);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_fad76a730ee7f68d0a59652fb12\``);
        await queryRunner.query(`ALTER TABLE \`images_course\` DROP FOREIGN KEY \`FK_65aa5f077a99c7ce5b6247155de\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP FOREIGN KEY \`FK_a2cecd1a3531c0b041e29ba46e1\``);
        await queryRunner.query(`ALTER TABLE \`sessions\` DROP FOREIGN KEY \`FK_da0cf19646ff5c6e3c0284468e5\``);
        await queryRunner.query(`ALTER TABLE \`complete_lessions\` DROP FOREIGN KEY \`FK_c8bac3e89b332a729cc27cfa74c\``);
        await queryRunner.query(`ALTER TABLE \`complete_lessions\` DROP FOREIGN KEY \`FK_78a1215b181ae27b589a539ddce\``);
        await queryRunner.query(`ALTER TABLE \`lessions_course\` DROP FOREIGN KEY \`FK_cbbdadd1a634cb81831ce8fa9cc\``);
        await queryRunner.query(`ALTER TABLE \`modules_course\` DROP FOREIGN KEY \`FK_de74e529342eda5189426aa4539\``);
        await queryRunner.query(`ALTER TABLE \`complete_modules\` DROP FOREIGN KEY \`FK_c841398f0b64d7e2ec9b759d01f\``);
        await queryRunner.query(`ALTER TABLE \`complete_modules\` DROP FOREIGN KEY \`FK_00b328356d513fc0fcda77e0d54\``);
        await queryRunner.query(`ALTER TABLE \`complete_courses\` DROP FOREIGN KEY \`FK_fe055f8392ad33fbab8a35bf4be\``);
        await queryRunner.query(`ALTER TABLE \`complete_courses\` DROP FOREIGN KEY \`FK_ec03919a03a645c9325cdadea13\``);
        await queryRunner.query(`ALTER TABLE \`carts\` DROP FOREIGN KEY \`FK_2ec1c94a977b940d85a4f498aea\``);
        await queryRunner.query(`ALTER TABLE \`cart_details\` DROP FOREIGN KEY \`FK_d8ee94ee444c3e0fc26d0707fbe\``);
        await queryRunner.query(`ALTER TABLE \`cart_details\` DROP FOREIGN KEY \`FK_c81e3af806614bbf45024de3ca4\``);
        await queryRunner.query(`DROP INDEX \`IDX_97ed8ec54f080edfff333138f5\` ON \`student_save_course\``);
        await queryRunner.query(`DROP INDEX \`IDX_5b9395d253d5a209e5d0a47416\` ON \`student_save_course\``);
        await queryRunner.query(`DROP TABLE \`student_save_course\``);
        await queryRunner.query(`DROP INDEX \`IDX_db06d82a57d7c9fb7dd36f5a63\` ON \`role_action\``);
        await queryRunner.query(`DROP INDEX \`IDX_f39cfd766e4b1a93e105c2fd67\` ON \`role_action\``);
        await queryRunner.query(`DROP TABLE \`role_action\``);
        await queryRunner.query(`DROP INDEX \`IDX_0ae481f2e0f919e059c1448739\` ON \`lession_video\``);
        await queryRunner.query(`DROP INDEX \`IDX_2c1d69a6da676702826c2f883c\` ON \`lession_video\``);
        await queryRunner.query(`DROP TABLE \`lession_video\``);
        await queryRunner.query(`DROP INDEX \`REL_05a0f282d3bed93ca048a7e54d\` ON \`social_accounts\``);
        await queryRunner.query(`DROP TABLE \`social_accounts\``);
        await queryRunner.query(`DROP TABLE \`vouchers\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(`DROP TABLE \`images_course\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP TABLE \`sessions\``);
        await queryRunner.query(`DROP TABLE \`roles\``);
        await queryRunner.query(`DROP TABLE \`actions\``);
        await queryRunner.query(`DROP TABLE \`complete_lessions\``);
        await queryRunner.query(`DROP TABLE \`lessions_course\``);
        await queryRunner.query(`DROP TABLE \`videos\``);
        await queryRunner.query(`DROP TABLE \`modules_course\``);
        await queryRunner.query(`DROP TABLE \`complete_modules\``);
        await queryRunner.query(`DROP TABLE \`complete_courses\``);
        await queryRunner.query(`DROP TABLE \`carts\``);
        await queryRunner.query(`DROP TABLE \`cart_details\``);
    }

}
