import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTable1682237645188 implements MigrationInterface {
    name = 'UpdateUserTable1682237645188'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aut_users_permissions\` DROP FOREIGN KEY \`FK_c4ffd851c441ee73eeffb06b647\``);
        await queryRunner.query(`ALTER TABLE \`aut_users_permissions\` DROP COLUMN \`id_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`aut_users_permissions\` ADD \`id_id\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`aut_users_permissions\` ADD CONSTRAINT \`FK_c4ffd851c441ee73eeffb06b647\` FOREIGN KEY (\`id_id\`) REFERENCES \`aut_user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
