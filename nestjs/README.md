### **NESTJS**

[notebook](docs.ipynb)

Migration:

npx typeorm-ts-node-commonjs migration:generate src/database/migrations/SchemaUpdate -d src/database/data-source.ts

Run migration: 

npx typeorm-ts-node-commonjs migration:run -d src/database/data-source.ts
