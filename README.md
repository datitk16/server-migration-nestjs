npx typeorm-ts-node-esm migration:generate ./src/migrations/update-post-table -d ./src/data-source.ts
npx typeorm-ts-node-esm migration:run  -d ./src/data-source.ts

https://orkhan.gitbook.io/typeorm/docs/migrations
