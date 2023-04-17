import { EntityTarget, QueryRunner, Table } from 'typeorm';

export const addColumn = async (queryRunner: QueryRunner, target: EntityTarget<any>, columnName: string) => {
  const metadata = queryRunner.connection.getMetadata(target);

  const table = Table.create(metadata, queryRunner.connection.driver);

  const existed = await queryRunner.hasColumn(table, columnName);

  if (existed) {
    return;
  }

  const column = table.columns.find((c) => c.name === columnName);

  if (column) {
    await queryRunner.addColumn(table, column);
  }
};
