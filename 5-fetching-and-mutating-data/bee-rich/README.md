# 5. Fetching and Mutating Data

In this chapter, you will learn how to fetch and mutate data in Remix. We already set up a routing hierarchy in the previous chapter that we will now fill with functionality.

## Getting started

Please note that the code in the [start](./start/) folder of this chapter is different from our final [solution](/5-fetching-and-mutating-data/bee-rich/solution/) from _Chapter 4, Routing in Remix_. For the start of this chapter, we set up Prisma with SQLite to store our data in a database.

If you want to reuse the code from the previous chapter, then follow this guide to get to the starting point of this chapter. Otherwise, feel free to checkout the code in the [start](./start/) folder and dive right into _Chapter 5, Fetching and Mutating Data_.

## Setting up Prisma with SQLite

Prisma is a database toolkit that is popular with the Remix community. In this chapter, we will use Prisma to add a SQLite database to BeeRich. SQLite is a file-based database that is easy to set up and use.

The code of _Chapter 5_ has Prisma already set up. If you want to add Prisma to your own project (e.g. the code of _Chapter 4_), you can follow the following steps:

1. **Install the Prisma CLI as a development dependency in your project**

```bash
npm install prisma --save-dev
```

2. **Initialize Prisma**

```bash
npx prisma init --datasource-provider sqlite
```

This will add both a `prisma` folder and a `.env` file to your project. The `.env` file contains the database connection string used by Prisma: `DATABASE_URL="file:./dev.db"`.

Please note that the `.env` file is ignored by git based on our `.gitignore` file. This is a good practice to keep your credentials out of version control.

3. **(Optional) Get the Prisma VSCode extension**

You can find the extension in the [VSCode marketplace](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma).

4. **Add helpful scripts to your `package.json`**

```json
"scripts": {
    "format:db": "npx prisma format",
    "build:db": "npx prisma generate",
    "update:db": "npx prisma db push",
    "seed": "npx ts-node prisma/seed.ts",
    "reset:db": "rimraf ./prisma/dev.db && npm run update:db && npm run seed"
}
```

- `format:db` formats the Prisma schema file
- `build:db` generates the Prisma client
- `update:db` updates the database schema of the SQLite database
- `seed` seeds the database with some initial mock data
- `reset:db` deletes the database by removing the `dev.db` file and then recreates it by running `update:db` and `seed`

5. **Update `.gitignore` to ignore the SQLite database file**

Add the following line to your `.gitignore` file:

```txt
/prisma/dev.db
```

6. **Model the data**

Add the following two data models to the `schema.prisma` file:

```prisma
model Expense {
  id           String   @id @default(uuid())
  title        String
  description  String?
  amount       Float
  currencyCode String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

model Invoice {
  id           String   @id @default(uuid())
  title        String
  description  String?
  amount       Float
  currencyCode String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}
```

Each model has an `id` field that is the primary key of the table. The `createdAt` and `updatedAt` fields are automatically managed by Prisma.

Having some questions? Please find more information in the [Prisma quick-start guide](https://www.prisma.io/docs/getting-started/quickstart). You can learn more about SQLite and Prisma [here](https://www.prisma.io/docs/concepts/database-connectors/sqlite).

7. **Update the database schema**

Run the following commands to update the database schema and generate the Prisma client:

```bash
npm run build:db && npm run update:db
```

8. **Create a wrapper for the Prisma client**

Usually you can import the Prisma client directly from `@prisma/client`. However, for it to work with Remix in development, we need to add a wrapper that stores the client in a cached variable.

Create a new file `db.server.ts` in the `app` folder and add the following code:

```ts
import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

declare global {
  // eslint-disable-next-line no-var
  var __db: PrismaClient | undefined;
}

// this is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change either.
if (process.env.NODE_ENV === "production") {
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

9. **Seed the database**

Create a new file `seed.ts` in the `prisma` folder and add the following code:

```ts
import { PrismaClient } from "@prisma/client";
const db = new PrismaClient();

const expenses = [
  {
    title: "Groceries",
    amount: 50,
    currencyCode: "USD",
    date: "2022-12-05",
  },
  {
    title: "Gym Membership",
    amount: 20,
    currencyCode: "USD",
    date: "2022-12-03",
  },
  {
    title: "Movies",
    amount: 20,
    currencyCode: "USD",
    date: "2022-12-02",
  },
  {
    title: "Mobile Service",
    amount: 55,
    currencyCode: "USD",
    date: "2022-11-01",
  },
  {
    title: "Rent December",
    amount: 1000,
    currencyCode: "USD",
    date: "2022-12-01",
  },
  {
    title: "Groceries",
    amount: 55,
    currencyCode: "USD",
    date: "2022-12-01",
  },
  {
    title: "Takeout",
    amount: 55,
    currencyCode: "USD",
    date: "2022-11-30",
  },
  {
    title: "Gym Membership",
    amount: 20,
    currencyCode: "USD",
    date: "2022-11-03",
  },
  {
    title: "Groceries",
    amount: 15,
    currencyCode: "USD",
    date: "2022-11-02",
  },
  {
    title: "Mobile Service",
    amount: 55,
    currencyCode: "USD",
    date: "2022-11-01",
  },
  {
    title: "Rent November",
    amount: 1000,
    currencyCode: "USD",
    date: "2022-11-01",
  },
  {
    title: "Groceries",
    amount: 55,
    currencyCode: "USD",
    date: "2022-10-30",
  },
  {
    title: "Groceries",
    amount: 55,
    currencyCode: "USD",
    date: "2022-10-15",
  },
  {
    title: "Dinner",
    amount: 40,
    currencyCode: "USD",
    date: "2022-10-11",
  },
  {
    title: "Gym Membership",
    amount: 20,
    currencyCode: "USD",
    date: "2022-10-03",
  },
  {
    title: "Groceries",
    amount: 25,
    currencyCode: "USD",
    date: "2022-10-02",
  },
  {
    title: "Mobile Service",
    amount: 55,
    currencyCode: "USD",
    date: "2022-10-01",
  },
  {
    title: "Rent October",
    amount: 1000,
    currencyCode: "USD",
    date: "2022-10-01",
  },
  {
    title: "Groceries",
    amount: 55,
    currencyCode: "USD",
    date: "2022-10-01",
  },
];

const income = [
  {
    title: "Salary December",
    amount: 2500,
    currencyCode: "USD",
    date: "2022-12-30",
  },
  {
    title: "Salary November",
    amount: 2500,
    currencyCode: "USD",
    date: "2022-11-30",
  },
  {
    title: "Salary October",
    amount: 2500,
    currencyCode: "USD",
    date: "2022-10-30",
  },
  {
    title: "Salary September",
    amount: 2500,
    currencyCode: "USD",
    date: "2022-09-30",
  },
];

async function seed() {
  const start = performance.now();
  const expensePromises = expenses.map((expense) => createExpense(expense));
  const invoicePromises = income.map((income) => createInvoice(income));
  await Promise.all([...expensePromises, ...invoicePromises]);
  const end = performance.now();
  console.log(`🚀 Seeded the database. Done in ${Math.round(end - start)}ms`);
}

function createExpense(expenseData: typeof expenses[number]) {
  return db.expense.create({
    data: {
      title: expenseData.title,
      amount: expenseData.amount,
      currencyCode: expenseData.currencyCode,
      createdAt: new Date(expenseData.date),
    },
  });
}

function createInvoice(incomeData: typeof income[number]) {
  return db.invoice.create({
    data: {
      title: incomeData.title,
      amount: incomeData.amount,
      currencyCode: incomeData.currencyCode,
      createdAt: new Date(incomeData.date),
    },
  });
}

seed();
```

This file will seed the database with some sample data. We can execute the script by running the following command:

```bash
npm run seed
```

- Run `npm run seed` anytime you want to add the sample data to the database.
- If you want to reset your database, use `npm run reset:db` to reset and seed the database.

**Great!** 🥳 We are all set to use Prisma in our project! 🎉

Dive into _Chapter 5, Fetching and Mutating Data_ now!

### Hosting environment considerations

Please note that a SQLite database requires write access to the filesystem. This can be problematic in some serverless environments. In this case, you may want to use a different database.

Luckily, switching to a different database is easy with Prisma. You can find more information about this in the [Prisma documentation](https://www.prisma.io/docs/concepts/database-connectors).
