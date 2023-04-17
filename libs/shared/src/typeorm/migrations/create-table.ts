import { EntityTarget, QueryRunner, Table } from 'typeorm';
import { addColumn } from './add-column';

export const createTable = async (queryRunner: QueryRunner, target: EntityTarget<any>) => {
  const metadata = queryRunner.connection.getMetadata(target);
  const table = Table.create(metadata, queryRunner.connection.driver);

  const existed = await queryRunner.hasTable(table);

  if (!existed) {
    await queryRunner.createTable(table, true);
  } else {
    await Promise.all(table.columns.map((column) => addColumn(queryRunner, target, column.name)));
    await Promise.all(table.indices.map((index) => queryRunner.createIndex(table, index).catch(console.error)));
    await Promise.all(table.foreignKeys.map((key) => queryRunner.createForeignKey(table, key).catch(console.error)));

    await Promise.all(
      table.uniques.map((unique) =>
        queryRunner.dropUniqueConstraint(table, unique).then(() => queryRunner.createUniqueConstraint(table, unique).catch(console.error)),
      ),
    );
    await Promise.all(table.checks.map((check) => queryRunner.createCheckConstraint(table, check).catch(console.error)));
    await Promise.all(table.exclusions.map((exclusion) => queryRunner.createExclusionConstraint(table, exclusion).catch(console.error)));
  }
};
