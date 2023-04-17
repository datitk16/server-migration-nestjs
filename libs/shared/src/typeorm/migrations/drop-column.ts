import { EntityTarget, QueryRunner, Table } from 'typeorm';

export const dropColumn = async (queryRunner: QueryRunner, target: EntityTarget<any>, columnName: string) => {
  const metadata = queryRunner.connection.getMetadata(target);

  const table = Table.create(metadata, queryRunner.connection.driver);

  const existed = await queryRunner.hasColumn(table, columnName);

  if (!existed) {
    return;
  }

  return await queryRunner.dropColumn(table, columnName);
};
