import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUser1681723271770 implements MigrationInterface {
    name = 'UpdateUser1681723271770'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`permissions\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`permissions\` varchar(255) NOT NULL`);
    }

}
