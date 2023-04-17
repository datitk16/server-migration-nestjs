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
    migrations: ["dist/db/migrations/*.js"],

}

const database = new DataSource(dataSourceOptions);
export default database;