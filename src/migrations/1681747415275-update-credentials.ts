import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCredentials1681747415275 implements MigrationInterface {
    name = 'UpdateCredentials1681747415275'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` ADD \`phoneNumber\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` DROP COLUMN \`phoneNumber\``);
    }

}
