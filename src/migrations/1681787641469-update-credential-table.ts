import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateCredentialTable1681787641469 implements MigrationInterface {
    name = 'UpdateCredentialTable1681787641469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`aut_unique_username_type_deleted_at\` ON \`aut_credentials\``);
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` CHANGE \`type\` \`type\` varchar(100) NULL DEFAULT 'id'`);
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` CHANGE \`status\` \`status\` varchar(100) NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` CHANGE \`sourceId\` \`sourceId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` CHANGE \`phoneNumber\` \`phoneNumber\` int NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`aut_unique_username_type_deleted_at\` ON \`aut_credentials\` (\`username\`, \`type\`, \`deletedAt\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`aut_unique_username_type_deleted_at\` ON \`aut_credentials\``);
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` CHANGE \`phoneNumber\` \`phoneNumber\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` CHANGE \`sourceId\` \`sourceId\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` CHANGE \`status\` \`status\` varchar(100) NOT NULL DEFAULT 'active'`);
        await queryRunner.query(`ALTER TABLE \`aut_credentials\` CHANGE \`type\` \`type\` varchar(100) NOT NULL DEFAULT 'id'`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`aut_unique_username_type_deleted_at\` ON \`aut_credentials\` (\`username\`, \`type\`, \`deletedAt\`)`);
    }

}
