# 13. Deferring Loader Data

In this chapter, we will learn how to defer loader data to enhance the user experience.

## Getting started

Before we get started, we have to update BeeRich. We want to add a changelog for expense and invoice data to allow users to review past changes and also revert back to previous versions.

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

## Adding changelogs for expenses and invoices

In this chapter, we want add changelogs to BeeRich. This will allow users to review and reset changes made over time.

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

3. **Update the expense utility functions**

Add the following code to `app/server/expenses.server.ts`:

```typescript
type ExpenseLogCreateData = Pick<
  Expense,
  "title" | "description" | "amount" | "currencyCode"
>;

async function createExpenseLog(
  userId: string,
  expenseId: string,
  data: ExpenseLogCreateData
) {
  return db.expenseLog.create({
    data: {
      ...data,
      user: { connect: { id: userId } },
      expense: { connect: { id: expenseId } },
    },
  });
}
```

Update the existing `createExpense` and `updateExpense` functions in `app/server/expenses.server.ts`.

```typescript
export async function createExpense({
  title,
  description,
  amount,
  attachment,
  userId,
}: ExpenseCreateData) {
  const expense = await db.expense.create({
    data: {
      title,
      description,
      amount,
      currencyCode: "USD",
      attachment,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  createExpenseLog(userId, expense.id, {
    title,
    description,
    amount,
    currencyCode: "USD",
  });
  return expense;
}
```

The `createExpense` function now also creates a `ExpenseLog` object upon expense creation. Since the `ExpenseLog` object depends on the expense identifier, we have to first create the expense object. To avoid more blocking time, we do not await the creation of the `ExpenseLog` object but rather treat it as an async side effect.

```typescript
export async function updateExpense({
  id,
  title,
  description,
  amount,
  attachment,
  userId,
}: ExpenseUpdateData) {
  const expense = await db.expense.update({
    where: { id_userId: { id, userId } },
    data: { title, description, amount, attachment },
  });
  createExpenseLog(userId, expense.id, expense);
  return expense;
}
```

Similarly, the `updateExpense` function now also creates a `ExpenseLog` object. To avoid more blocking time, we again treat the creation of the `ExpenseLog` object as an async side effect.

4. **Update the invoice utility functions**

Add the following code to `app/server/invoices.server.ts`:

```typescript
type InvoiceLogCreateData = Pick<
  Invoice,
  "title" | "description" | "amount" | "currencyCode"
>;

async function createInvoiceLog(
  userId: string,
  invoiceId: string,
  data: InvoiceLogCreateData
) {
  return db.invoiceLog.create({
    data: {
      ...data,
      user: { connect: { id: userId } },
      invoice: { connect: { id: invoiceId } },
    },
  });
}
```

Follow the same pattern as with the expense utilities and update the existing `createInvoice` and `updateInvoice` functions in `app/server/invoices.server.ts`.

`createInvoice` changes:

```typescript
export async function createInvoice({
  title,
  description,
  amount,
  attachment,
  userId,
}: InvoiceCreateData) {
  const invoice = await db.invoice.create({
    data: {
      title,
      description,
      amount,
      currencyCode: "USD",
      attachment,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  createInvoiceLog(userId, invoice.id, {
    title,
    description,
    amount,
    currencyCode: "USD",
  });
  return invoice;
}
```

`updateInvoice` changes:

```typescript
export async function updateInvoice({
  id,
  title,
  description,
  amount,
  attachment,
  userId,
}: InvoiceUpdateData) {
  const invoice = await db.invoice.update({
    where: { id_userId: { id, userId } },
    data: { title, description, amount, attachment },
  });
  createInvoiceLog(userId, invoice.id, invoice);
  return invoice;
}
```

Awesome! We are now ready to jump into _Chapter 13, Deferring Loader Data_. 🚀
