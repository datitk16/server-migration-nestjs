import { EntityTarget, QueryRunner } from 'typeorm';

export const dropTable = async (queryRunner: QueryRunner, target: EntityTarget<any>) => {
  const metadata = queryRunner.connection.getMetadata(target);
  await queryRunner.dropTable(metadata.tableName);
};
