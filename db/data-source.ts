import { DataSource, DataSourceOptions } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

export const dataSourceOptions: DataSourceOptions = {
    type: 'mysql',
    host: 'nestjs.cdnu3ojpcemk.us-east-2.rds.amazonaws.com',
    port: 3306,
    username: 'admin',
    password: 'password',
    database: 'company',
    entities: ['dist/**/*.entity{.ts,.js}', 'dist/**/entity{.ts,.js}'],
    migrationsTableName: 'table_name',
    migrations: ["dist/db/migrations/*.js"],
    namingStrategy: new SnakeNamingStrategy(),
}

const database = new DataSource(dataSourceOptions);
export default database;

/**
 * - đâù tiên chạy npm run start:dev để cập nhật folder dist 
 * - chạy lệnh : npx typeorm-ts-node-esm migration:generate ./src/migrations/update-post-table -d ./db/data-source.ts 
 *   - update-post-table là tên mình muốn đặt cho file migration
 *   - chạy lện npx typeorm-ts-node-esm migration:run -d ./db/data-source.ts để update vào data base
 */