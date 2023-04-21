import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateAutUserTable1682091939278 implements MigrationInterface {
    name = 'UpdateAutUserTable1682091939278'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`aut_user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`created_by\` int NULL, \`updated_by\` int NULL, \`deleted_by\` int NULL, \`type\` varchar(100) NULL DEFAULT 'id', \`email\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` varchar(100) NULL DEFAULT 'active', \`source_id\` int NULL, \`phone_number\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`aut_user\``);
    }

}
