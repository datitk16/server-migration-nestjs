import { EntityTarget, QueryRunner } from 'typeorm';

export const getColumn = async (queryRunner: QueryRunner, target: EntityTarget<any>, columnName: string) => {
  const metadata = queryRunner.connection.getMetadata(target);
  const table = await queryRunner.getTable(metadata.tablePath);

  return table.columns.find((c) => c.name === columnName);
};
