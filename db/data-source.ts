/* eslint-disable prettier/prettier */
import { DataSource, DataSourceOptions } from "typeorm";



export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'password',
    database: 'company',
    entities: ['dist/**/*.entity{.ts,.js}'],
    migrationsTableName: 'table_name',
    migrations: ["dist/src/migrations/*.js"],

}

const database = new DataSource(dataSourceOptions);
export default database;

/**
 * - đâù tiên chạy npm run start:dev để cập nhật folder dist 
 * - chạy lệnh : npx typeorm-ts-node-esm migration:generate ./src/migrations/update-post-table -d ./db/data-source.ts 
 *   - update-post-table là tên mình muốn đặt cho file migration
 *  
 */