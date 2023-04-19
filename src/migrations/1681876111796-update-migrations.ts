import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateMigrations1681876111796 implements MigrationInterface {
    name = 'UpdateMigrations1681876111796'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`job\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`jobTitle\` varchar(255) NOT NULL, \`minSalary\` varchar(255) NOT NULL, \`maxSalary\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employee\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phoneNumber\` varchar(255) NOT NULL, \`hireDate\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`departmentName\` varchar(255) NOT NULL, \`department_employee_id\` int NULL, UNIQUE INDEX \`REL_1a237f26f1599ee131efb1c716\` (\`department_employee_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`salary\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`salary\` varchar(255) NOT NULL, \`fromDate\` datetime NOT NULL, \`toDate\` datetime NOT NULL, \`salary_employee_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`time_off\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`startDate\` datetime NOT NULL, \`endDate\` datetime NOT NULL, \`reason\` varchar(255) NULL, \`salary_employee_id\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`aut_credentials\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deletedAt\` datetime(6) NULL, \`createdBy\` int NULL, \`updatedBy\` int NULL, \`deletedBy\` int NULL, \`type\` varchar(100) NULL DEFAULT 'id', \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` varchar(100) NULL DEFAULT 'active', \`sourceId\` int NULL, \`phoneNumber\` int NULL, UNIQUE INDEX \`aut_unique_username_type_deleted_at\` (\`username\`, \`type\`, \`deletedAt\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`department\` ADD CONSTRAINT \`FK_1a237f26f1599ee131efb1c716a\` FOREIGN KEY (\`department_employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`salary\` ADD CONSTRAINT \`FK_0364cd37eb8379045965e768028\` FOREIGN KEY (\`salary_employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`time_off\` ADD CONSTRAINT \`FK_99062cd0cbae7f670d88d9a5369\` FOREIGN KEY (\`salary_employee_id\`) REFERENCES \`employee\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`time_off\` DROP FOREIGN KEY \`FK_99062cd0cbae7f670d88d9a5369\``);
        await queryRunner.query(`ALTER TABLE \`salary\` DROP FOREIGN KEY \`FK_0364cd37eb8379045965e768028\``);
        await queryRunner.query(`ALTER TABLE \`department\` DROP FOREIGN KEY \`FK_1a237f26f1599ee131efb1c716a\``);
        await queryRunner.query(`DROP INDEX \`aut_unique_username_type_deleted_at\` ON \`aut_credentials\``);
        await queryRunner.query(`DROP TABLE \`aut_credentials\``);
        await queryRunner.query(`DROP TABLE \`time_off\``);
        await queryRunner.query(`DROP TABLE \`salary\``);
        await queryRunner.query(`DROP INDEX \`REL_1a237f26f1599ee131efb1c716\` ON \`department\``);
        await queryRunner.query(`DROP TABLE \`department\``);
        await queryRunner.query(`DROP TABLE \`employee\``);
        await queryRunner.query(`DROP TABLE \`job\``);
    }

}
