npx typeorm-ts-node-esm migration:generate ./db/migrations/update-aut_user-table -d ./db/data-source.ts
npx typeorm-ts-node-esm migration:run -d ./src/data-source.ts

https://orkhan.gitbook.io/typeorm/docs/migrations
