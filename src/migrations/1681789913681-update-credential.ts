import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCredential1681789913681 implements MigrationInterface {
    name = 'UpdateCredential1681789913681'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` ADD \`email\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` DROP COLUMN \`email\``);
    }

}
