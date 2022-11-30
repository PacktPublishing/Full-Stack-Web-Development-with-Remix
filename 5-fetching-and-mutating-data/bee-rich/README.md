# 5. Fetching and Mutating Data

## Setting up Prisma with SQLite

Prisma is a database toolkit that is popular with the Remix community. In this chapter, we will use Prisma to add a SQLite database to BeeRich. SQLite is a file-based database that is easy to set up and use.

The code of chapter 5 has Prisma already set up. If you want to add Prisma to your own project (e.g. the code of chapter 4), you can follow the following steps:

1. Install the Prisma CLI as a development dependency in your project:

```bash
npm install prisma --save-dev
```

2. Initialize Prisma:

```bash
npx prisma init --datasource-provider sqlite
```

This will add both a `prisma` folder and a `.env` file to your project. The `.env` file contains the database connection string used by Prisma.

3. (Optional) Get the Prisma VSCode extension

You can find the extension in the [VSCode marketplace](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma).

4. Add helpful scripts to your `package.json`:

```json
"scripts": {
    "format:db": "npx prisma format",
    "build:db": "npx prisma generate",
    "update:db": "npx prisma db push",
    "reset:db": "npx prisma db reset"
}
```

- `format:db` formats the Prisma schema file
- `build:db` generates the Prisma client
- `update:db` updates the database schema of the SQLite database
- `reset:db` resets the database by dropping all tables and recreating them

5. Update `.gitignore` to ignore the SQLite database file:

```
/prisma/dev.db
```

6. Model our data

Add the following two data models to the `schema.prisma` file:

```prisma
model Expense {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  amount      Decimal
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Invoice {
  id          Int      @id @default(autoincrement())
  title       String
  description String
  amount      Decimal
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

Each model has an `id` field that is the primary key of the table. The `createdAt` and `updatedAt` fields are automatically managed by Prisma.

Having some questions? Please find more information in the [Prisma quick-start guide](https://www.prisma.io/docs/getting-started/quickstart). You can learn more about SQLite and Prisma [here](https://www.prisma.io/docs/concepts/database-connectors/sqlite).

7. Update the database schema

Run the following commands to update the database schema and generate the Prisma client:

```bash
npm run build:db && npm run update:db
```

8. Create a wrapper for the Prisma client

Usually you can import the Prisma client directly from `@prisma/client`. However, for it to work with Remix in development, we need to add a wrapper that stores the client in a cached variable.

Create a new file `db.server.ts` in the `app` folder and add the following code:

```ts
import { PrismaClient } from '@prisma/client';

let db: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
  }
  db = global.__db;
}

export { db };
```

You can find more information about this wrapper in the database section of the [Remix Jokes App Tutorial](https://remix.run/docs/en/v1/tutorials/jokes#connect-to-the-database).

Great! 🥳 We are all set to use Prisma in our project!

### Hosting environment considerations

Please note that a SQLite database requires write access to the filesystem. This can be problematic in some serverless environments environments. In this case, you may want to use a different database.

Luckily, switching to a different database is easy with Prisma. You can find more information about this in the [Prisma documentation](https://www.prisma.io/docs/concepts/database-connectors).
