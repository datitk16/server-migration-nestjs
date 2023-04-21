import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAutUserTable1682092856032 implements MigrationInterface {
    name = 'UpdateAutUserTable1682092856032'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aut_user\` ADD \`permission\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aut_user\` DROP COLUMN \`permission\``);
    }

}
