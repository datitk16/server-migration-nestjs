import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAuth1681747178410 implements MigrationInterface {
    name = 'CreateAuth1681747178410'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`CREATE TABLE \`aut_credentials\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`businessUnitId\` int NULL, \`type\` varchar(100) NOT NULL DEFAULT 'id', \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` varchar(100) NOT NULL DEFAULT 'active', \`sourceId\` int NOT NULL, UNIQUE INDEX \`aut_unique_username_type_deleted_at\` (\`username\`, \`type\`, \`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`permissions\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`username\` varchar(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`first_name\` varchar(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_name\` varchar(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`avatar\` varchar(250) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`salt\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone_number\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`signature\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`token_2fa\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`token_2fa_expiry\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`profile\` json NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`activated\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_login\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`force_change_password\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`reset_password_token\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`created_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`updated_at\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(128) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`email\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`updated_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`created_at\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`reset_password_token\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`force_change_password\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_login\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`activated\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`profile\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`token_2fa_expiry\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`token_2fa\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`signature\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone_number\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`salt\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`avatar\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`first_name\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`username\``);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`permissions\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`name\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phoneNumber\` int NOT NULL`);
        await queryRunner.query(`DROP INDEX \`aut_unique_username_type_deleted_at\` ON \`aut_credentials\``);
        await queryRunner.query(`DROP TABLE \`aut_credentials\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\` (\`email\`)`);
    }

}
