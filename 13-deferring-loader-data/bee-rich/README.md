# 13. Deferring Loader Data

In this chapter, we will learn how to defer loader data to enhance the user experience.

## Getting started

Before we get started, we have to update BeeRich. We want to add a changelog for expense and invoice data. The changelog will allow users to view changes made over time.

If you want to reuse your code from the previous chapter, then follow this guide to get to the starting point of this chapter. Otherwise, feel free to checkout the code in the [start](./start/) folder and dive right into _Chapter 13, Deferring Loader Data_.

### Run the application

Follow these steps to get your application up and running:

1. Make sure you have a `.env` file in the root of your project and that it contains the following:

```text
DATABASE_URL="file:./dev.db"
SESSION_SECRET="[A secret string]"
```

2. Install the dependencies.

```bash
npm install
```

3. Generate the Prisma client

```bash
npm run build
```

4. Update the SQLite database schema

```bash
npm run update:db
```

5. Start the development server

```bash
npm run dev
```

This starts the development server on port `3000`. You can now open the application in your browser at [http://localhost:3000](http://localhost:3000).

In case you receive Prisma errors during build, schema update, or runtime, you can reset the database by running the following command:

```bash
npm run reset:db
```

6. Seed the database with test data

```bash
npm run seed
```

This is optional, but can be helpful for testing. Note that with the current setup, you can only seed the database once. After that, `npm run seed` will fail on the unique email constraint during the test user creation.

Test credentials:

- Email: john.doe@example.com
- Password: BeeRich

You can also update the seed data in `prisma/seed.ts`.

## Adding changelogs for expenses and invoices

In this chapter, we want add changelogs to BeeRich. This will allow users to review changes made over time.

1. **Add the `ExpenseLog` and `InvoiceLog` schemas**

First, let's add two new schemas to the Prisma database schema file for expense and invoice data.

```prisma
model ExpenseLog {
  id           String   @id @default(uuid())
  title        String
  description  String?
  amount       Float
  currencyCode String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId       String
  expense      Expense  @relation(fields: [expenseId], references: [id], onDelete: Cascade)
  expenseId    String

  @@unique([id, userId])
}

model InvoiceLog {
  id           String   @id @default(uuid())
  title        String
  description  String?
  amount       Float
  currencyCode String
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId       String
  invoice      Invoice  @relation(fields: [invoiceId], references: [id], onDelete: Cascade)
  invoiceId    String

  @@unique([id, userId])
}
```

Note that we specify the `onDelete` behavior for the `user`, `expense`, and `invoice` relations. This ensures that the changelog data is deleted when the user, expense, or invoice is deleted.

2. **Update the `User`, `Expense`, and `Invoice` schemas**

Next, we have to update the existing schemas.

```diff
model Expense {
  id           String   @id @default(uuid())
  title        String
  description  String?
  amount       Float
  currencyCode String
  attachment   String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId       String
+  logs        ExpenseLog[]

  @@unique([id, userId])
}

model Invoice {
  id           String   @id @default(uuid())
  title        String
  description  String?
  amount       Float
  currencyCode String
  attachment   String?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId       String
+  logs        InvoiceLog[]

  @@unique([id, userId])
}

model User {
  id        String    @id @default(uuid())
  email     String    @unique
  name      String
  password  String
  createdAt DateTime  @default(now())
  updatedAt DateTime  @updatedAt
  expenses  Expense[]
  invoices  Invoice[]
+  expenseLogs ExpenseLog[]
+  invoiceLogs InvoiceLog[]
}
```

3. **Update the BeeRich database seed script**

Update the `prisma/seed.ts` script to include `ExpenseLog` and `InvoiceLog` mock data.

```typescript
import type { Expense, Invoice, User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const db = new PrismaClient();

const expenses = [
  {
    title: 'Groceries',
    amount: 50,
    currencyCode: 'USD',
    date: '2022-12-05',
  },
  {
    title: 'Gym Membership',
    amount: 20,
    currencyCode: 'USD',
    date: '2022-12-03',
  },
  {
    title: 'Movies',
    amount: 20,
    currencyCode: 'USD',
    date: '2022-12-02',
  },
  {
    title: 'Mobile Service',
    amount: 55,
    currencyCode: 'USD',
    date: '2022-11-01',
  },
  {
    title: 'Rent December',
    amount: 1000,
    currencyCode: 'USD',
    date: '2022-12-01',
  },
  {
    title: 'Groceries',
    amount: 55,
    currencyCode: 'USD',
    date: '2022-12-01',
  },
  {
    title: 'Takeout',
    amount: 55,
    currencyCode: 'USD',
    date: '2022-11-30',
  },
  {
    title: 'Gym Membership',
    amount: 20,
    currencyCode: 'USD',
    date: '2022-11-03',
  },
  {
    title: 'Groceries',
    amount: 15,
    currencyCode: 'USD',
    date: '2022-11-02',
  },
  {
    title: 'Mobile Service',
    amount: 55,
    currencyCode: 'USD',
    date: '2022-11-01',
  },
  {
    title: 'Rent November',
    amount: 1000,
    currencyCode: 'USD',
    date: '2022-11-01',
  },
  {
    title: 'Groceries',
    amount: 55,
    currencyCode: 'USD',
    date: '2022-10-30',
  },
  {
    title: 'Groceries',
    amount: 55,
    currencyCode: 'USD',
    date: '2022-10-15',
  },
  {
    title: 'Dinner',
    amount: 40,
    currencyCode: 'USD',
    date: '2022-10-11',
  },
  {
    title: 'Gym Membership',
    amount: 20,
    currencyCode: 'USD',
    date: '2022-10-03',
  },
  {
    title: 'Groceries',
    amount: 25,
    currencyCode: 'USD',
    date: '2022-10-02',
  },
  {
    title: 'Mobile Service',
    amount: 55,
    currencyCode: 'USD',
    date: '2022-10-01',
  },
  {
    title: 'Rent October',
    amount: 1000,
    currencyCode: 'USD',
    date: '2022-10-01',
  },
  {
    title: 'Groceries',
    amount: 55,
    currencyCode: 'USD',
    date: '2022-10-01',
  },
];

const income = [
  {
    title: 'Salary December',
    amount: 2500,
    currencyCode: 'USD',
    date: '2022-12-30',
  },
  {
    title: 'Salary November',
    amount: 2500,
    currencyCode: 'USD',
    date: '2022-11-30',
  },
  {
    title: 'Salary October',
    amount: 2500,
    currencyCode: 'USD',
    date: '2022-10-30',
  },
  {
    title: 'Salary September',
    amount: 2500,
    currencyCode: 'USD',
    date: '2022-09-30',
  },
];

function createExpense(expenseData: (typeof expenses)[number], user: User) {
  return db.expense.create({
    data: {
      title: expenseData.title,
      amount: expenseData.amount,
      currencyCode: expenseData.currencyCode,
      createdAt: new Date(expenseData.date),
      userId: user.id,
    },
  });
}

function createInvoice(incomeData: (typeof income)[number], user: User) {
  return db.invoice.create({
    data: {
      title: incomeData.title,
      amount: incomeData.amount,
      currencyCode: incomeData.currencyCode,
      createdAt: new Date(incomeData.date),
      userId: user.id,
    },
  });
}

function createExpenseLog({ userId, id, title, description, currencyCode, amount }: Expense) {
  return db.expenseLog.create({
    data: {
      title,
      description,
      currencyCode,
      amount,
      userId,
      expenseId: id,
    },
  });
}

function createInvoiceLog({ userId, id, title, description, currencyCode, amount }: Invoice) {
  return db.invoiceLog.create({
    data: {
      title,
      description,
      currencyCode,
      amount,
      userId,
      invoiceId: id,
    },
  });
}

console.log('🌱 Seeding the database...');
const start = performance.now();
const user = await db.user.create({
  data: {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: await bcrypt.hash('BeeRich', 10),
  },
});
const expensePromises = Promise.all(expenses.map((expense) => createExpense(expense, user)));
const invoicePromises = Promise.all(income.map((income) => createInvoice(income, user)));
const [createdExpenses, createdInvoices] = await Promise.all([expensePromises, invoicePromises]);
const expenseLogPromises = createdExpenses.map((expense) => createExpenseLog(expense));
const invoiceLogPromises = createdInvoices.map((invoice) => createInvoiceLog(invoice));
await Promise.all([...expenseLogPromises, ...invoiceLogPromises]);
const end = performance.now();
console.log(`🚀 Seeded the database. Done in ${Math.round(end - start)}ms`);
```

The script now iterates over every created expense and invoice object to create associated expense and invoice log objects.

4. **Update the database**

Run `npm run build:db` to generate new Prisma types.

Run `npm run update:db` to push the latest schema changes to the SQLite database and `npm run reset:db` if you want to reset the stored data and run the seeding script.

5. **Update the `createExpense` utility function**

Update the existing `createExpense` function in `app/modules/expenses.server.ts`:

```typescript
export function createExpense({ title, description, amount, attachment, userId }: ExpenseCreateData) {
  return db.expense.create({
    data: {
      title,
      description,
      amount,
      currencyCode: 'USD',
      attachment,
      user: {
        connect: {
          id: userId,
        },
      },
      logs: {
        create: {
          title,
          description,
          amount,
          currencyCode: 'USD',
          user: { connect: { id: userId } },
        },
      },
    },
  });
}
```

The `createExpense` function now also creates a `ExpenseLog` object upon expense creation. Note that we create the `expense` and `expenseLog` objects in a single transaction using [Prisma's nested writes](https://www.prisma.io/docs/concepts/components/prisma-client/transactions#nested-writes). This ensures that the `expense` and `expenseLog` objects either succeed or fail together.

6. **Update the `updateExpense` utility function**

Next, update the existing `updateExpense` functions in `app/modules/expenses.server.ts`.

```typescript
export function updateExpense({ id, title, description, amount, attachment, userId }: ExpenseUpdateData) {
  return db.expense.update({
    where: { id_userId: { id, userId } },
    data: {
      title,
      description,
      amount,
      attachment,
      logs: {
        create: {
          title,
          description,
          amount,
          currencyCode: 'USD',
          user: { connect: { id: userId } },
        },
      },
    },
  });
}
```

Similarly, the `updateExpense` function now also creates a `ExpenseLog` object. We again use a single transaction to ensure that the `expenseLog` object is only created if the `expense` object is successfully updated (and wise versa).

7. **Update the invoice utility functions**

Follow the same pattern as with the expense utilities and update the existing `createInvoice` and `updateInvoice` functions in `app/modules/invoices.server.ts`.

`createInvoice` changes:

```typescript
export function createInvoice({ title, description, amount, attachment, userId }: InvoiceCreateData) {
  return db.invoice.create({
    data: {
      title,
      description,
      amount,
      currencyCode: 'USD',
      attachment,
      user: {
        connect: {
          id: userId,
        },
      },
      logs: {
        create: {
          title,
          description,
          amount,
          currencyCode: 'USD',
          user: { connect: { id: userId } },
        },
      },
    },
  });
}
```

`updateInvoice` changes:

```typescript
export function updateInvoice({ id, title, description, amount, attachment, userId }: InvoiceUpdateData) {
  return db.invoice.update({
    where: { id_userId: { id, userId } },
    data: {
      title,
      description,
      amount,
      attachment,
      logs: {
        create: {
          title,
          description,
          amount,
          currencyCode: 'USD',
          user: { connect: { id: userId } },
        },
      },
    },
  });
}
```

Awesome! We are now ready to jump into _Chapter 13, Deferring Loader Data_. 🚀

## 🐞 Bugs 🐛

### Deferring loader data does not work when navigating between different expense details pages

Note that there is a small bug in the code in the book. After finishing the chapter, you may notice that deferring the loader data does not work when navigating between different expense details pages. Luckily, there is an easy fix! Finish the chapter and then refer to this bug issue to understand the problem and learn how to fix it: https://github.com/PacktPublishing/Full-Stack-Web-Development-with-Remix/issues/129.
