import { EntityTarget, QueryRunner, TableColumnOptions } from 'typeorm';

export const updateColumn = async (queryRunner: QueryRunner, target: EntityTarget<any>, columnName: string, options: Partial<TableColumnOptions> = {}) => {
  const metadata = queryRunner.connection.getMetadata(target);
  const table = await queryRunner.getTable(metadata.tablePath);

  const oldColumn = table.columns.find((c) => c.name === columnName);

  if (oldColumn) {
    const newColumn = oldColumn.clone();

    Object.entries(options).forEach(([key, value]) => {
      newColumn[key] = value;
    });

    return await queryRunner.changeColumn(table, oldColumn, newColumn);
  }
};
