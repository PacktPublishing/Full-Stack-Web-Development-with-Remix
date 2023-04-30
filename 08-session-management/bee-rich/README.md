# 8. Session Management

In this chapter, you will learn about session management in Remix. First, we will use the URL to store application state. Next, we will utilize cookies to manage user sessions. Finally, we will see how to authenticate users with session cookies.

## Getting started

Note that the code in the [start](./start/) folder of this chapter is different from our final [solution](/07-error-handling-in-remix/bee-rich/solution/) from _Chapter 7, Error Handling in Remix_.

If you want to reuse the code from the previous chapter, then follow this guide before starting this chapter. Otherwise, feel free to checkout the code in the [start](./start/) folder and dive right into _Chapter 8, Session Management_.

### Run the application

First, follow the section below to update the Prisma schema and introduce a `User` model to the database. After that, you can run the application.

Follow these steps to get your application up and running:

1. Make sure you have a `.env` file in the root of your project and that it contains the following line:

```text
DATABASE_URL="file:./dev.db"
```

2. Install the dependencies.

```bash
npm install
```

3. Generate the Prisma client

```bash
npm run build
```

4. Update the MySQL database schema

```bash
npm run update:db
```

5. Start the development server

```bash
npm run dev
```

This starts the development server on port `3000`. You can now open the application in your browser at [http://localhost:3000](http://localhost:3000).

## Introducing users to BeeRich

So, far we don't have a concept of users in BeeRich. To change that, let's first update our database model.

1. **Add a `User` model to the database schema**

Add the following `User` model to the `/prisma/schema.prisma` file:

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  expenses  Expense[]
  invoices  Invoice[]
}
```

Each user can have multiple expenses and invoices associated to them. In Prisma, we model this through a [one-to-many relation](https://www.prisma.io/docs/concepts/components/prisma-schema/relations/one-to-many-relations) between the `User` and the `Expense` and `Invoice` models.

2. **Add a reference to a user to the `Expense` and `Invoice` models**

We also have to update the `Expense` and `Invoice` models to specify that each expense and invoice is associated to a specific user.

Add the following two fields to both the `Expense` and `Invoice` models:

```prisma
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  userId       String
```

This adds a `userId` field to both the `Expense` and `Invoice` model. The `userId` field specifies that each expense and invoice is associated to exactly one user.

The `@relation` definition is used to specify the relation between the `User` and `Expense` and `Invoice` models. In the `Expense` and `Invoice` models, the `userId` field is used as the foreign key to refer to the `User` model. The `userId` field points to the `id` field of the `User` model. We also specify that on deletion of the user object, all referenced expenses and invoices should be deleted as well (cascade).

3. **Mark the combination of id and userId as a unique key**

We also want to make sure that each expense and invoice is unique for a specific user. To do so, we can mark the combination of the `id` and `userId` fields as a unique key.

Add the following line to the `Expense` and `Invoice` models:

```prisma
@@unique([id, userId])
```

This allows us to query for a unique expense or invoice by a `id` and `userId` field combination. This is useful when we want to query for a unique expense or invoice for a specific user.

4. **Build the new database schema**

Run `npm run build:db` to create the new database model.

Make sure to run `npm i` before running `npm run build:db` if you haven't already.

5. **Install bcryptjs**

Now that we are going to store user passwords in our database, we must ensure that they are not stored in plain text. To do so, we will use the [bcryptjs](https://www.npmjs.com/package/bcryptjs) package.

Run `npm i bcryptjs` to install the package.

Next, run `npm install --save-dev @types/bcryptjs` to install the TypeScript types for the package.

6. **Update the seed script**

Let's also update the `/prisma/seed.ts` script. Every expense and invoice object in our database now requires a reference to a user.

First, let's import `bcryptjs` and the `User` type from Prisma:

```diff
+import type { User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';
+import bcrypt from 'bcryptjs';
```

Next, update the seed function to first create a test user. Feel free to update the user mock data to whatever you like:

```diff
async function seed() {
  const start = performance.now();
+ const user = await db.user.create({
+   data: {
+     name: 'John Doe',
+     email: 'john.doe@example.com',
+     password: await bcrypt.hash('BeeRich', 10),
+   },
+ });
+ const expensePromises = expenses.map((expense) => createExpense(expense, user));
+ const invoicePromises = income.map((income) => createInvoice(income, user));
- const expensePromises = expenses.map((expense) => createExpense(expense));
- const invoicePromises = income.map((income) => createInvoice(income));
  await Promise.all([...expensePromises, ...invoicePromises]);
  const end = performance.now();
  console.log(`🚀 Seeded the database. Done in ${Math.round(end - start)}ms`);
}
```

The updated `seed` function creates a mock user. It then passed the mock user as the second argument to the `createExpense` and `createInvoice` helper functions.

Update the `createExpense` and `createInvoice` helper functions to accept a user object. Update the creation query to connect the created expense and invoice objects to the user:

```diff
+ function createExpense(expenseData: typeof expenses[number], user: User) {
  return db.expense.create({
    data: {
      title: expenseData.title,
      amount: expenseData.amount,
      currencyCode: expenseData.currencyCode,
      createdAt: new Date(expenseData.date),
+     userId: user.id,
    },
  });
}

+ function createInvoice(incomeData: typeof income[number], user: User) {
  return db.invoice.create({
    data: {
      title: incomeData.title,
      amount: incomeData.amount,
      currencyCode: incomeData.currencyCode,
      createdAt: new Date(incomeData.date),
+     userId: user.id,
    },
  });
}
```

7. **Reset the database**

Now that we updated the seed script, it's time to commit our schema changes to our dev database.

The easiest way to do so is to delete the existing database.

Run `npm run reset:db` to execute our reset script. It will delete the dev database, create a new one, and run the seed script.

8. **Start the dev server**

Run `npm run dev`, open a new browser window, and navigate to the dashboard (http://localhost:3000/dashboard).

BeeRich should run without issues and the dashboard should display all expenses created by `seed.ts`.

9. **Create the `session.server.ts` file**

Let's also prepare some code for the register and login flow that we will add to BeeRich in this chapter.

Create a new `session.server.ts` file the in `/app` folder. The `.server` postfix tells Remix to add the file only to the server but not the client bundle.

10. **Implement the `register` and `login` functions**

Add the following code to the `session.server.ts` file:

```ts
import { db } from "./db.server";
import bcrypt from "bcryptjs";
import type { User } from "@prisma/client";

type UserRegistrationData = {
  name: string;
  email: string;
  password: string;
};

export async function registerUser({
  name,
  email,
  password,
}: UserRegistrationData): Promise<User> {
  const hashedPassword = await bcrypt.hash(password, 10);
  const sanitizedEmail = email.trim().toLowerCase();
  const sanitizedName = name.trim();

  const existingUser = await db.user.findUnique({
    where: { email: sanitizedEmail },
  });

  if (existingUser) {
    throw new Error(`A user with the email ${email} already exists.`);
  }

  try {
    return db.user.create({
      data: {
        name: sanitizedName,
        email: sanitizedEmail,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error("Unable to create user.");
  }
}

type UserLoginData = {
  email: string;
  password: string;
};

export async function loginUser({
  email,
  password,
}: UserLoginData): Promise<User> {
  const sanitizedEmail = email.trim().toLowerCase();

  const user = await db.user.findUnique({
    where: { email: sanitizedEmail },
  });

  if (!user) {
    throw new Error(`No user found for email: ${email}.`);
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw new Error("Invalid password.");
  }

  return user;
}
```

Both functions will help us to implement the authentication flow in this chapter. These functions take the register and login form data as arguments and either throw an error or return a user object.

**Note:** The updated Prisma schema introduces some errors in our `action` functions. We will need to update the code to add the `userId` to the `expense` and `invoice` objects. We will do so in the chapter's exercises.

**Great!** 🥳 We are all set to use the `User` model to start implementing the authentication flow in BeeRich! 🎉

It's time to start _Chapter 8, Session Management_!