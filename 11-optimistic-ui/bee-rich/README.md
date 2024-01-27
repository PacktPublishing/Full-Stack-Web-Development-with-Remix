# 11. Optimistic UI

In this chapter, we will learn how to implement optimistic UI with Remix.

## Getting started

Congratulations on making it this far! You have learned a lot about Remix and have built a fully functional application. In the following chapters, we will focus on advanced topics. Before we get started, let's refactor our application a bit to make it easier to work with.

If you want to reuse your code from the previous chapter, then follow this guide to get to the starting point of this chapter. Otherwise, feel free to checkout the code in the [start](./start/) folder and dive right into _Chapter 11, Optimistic UI_.

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

## Refactoring BeeRich

Remix is not opinionated about how you structure your code. So far, we mostly used the `/routes` folder for everything from querying the database to rendering the UI. The co-location is convenient, but now might be a good time to create some abstractions and refactor our code to make it easier to work with.

We will:

- Move the database queries into separate files.
- Use a data validation library to validate the form data.

Let's get started!

1. **Install zod**

Install `zod`:

```bash
npm install zod
```

So far, we validated our `FormData`by using `if` statements. Now, we will add a data validation library. 

[Zod](https://www.npmjs.com/package/zod) is a TypeScript-first schema declaration and validation library. Zod lets us define schemas to validate our data. Zod automatically infers the type of the parsed data, which provides a great developer experience.


2. **Implement expense helper functions**

Create a new `app/modules/expenses.server.ts` file and add the following code to the  file:

```ts
import zod from 'zod';

import { deleteAttachment } from '~/modules/attachments.server';
import { db } from '~/modules/db.server';

type ExpenseCreateData = {
  title: string;
  description: string;
  amount: number;
  userId: string;
  attachment?: string;
};

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
    },
  });
}

export async function deleteExpense(id: string, userId: string) {
  const expense = await db.expense.delete({ where: { id_userId: { id, userId } } });
  if (expense.attachment) {
    deleteAttachment(expense.attachment);
  }
}

type ExpenseUpdateData = {
  id: string;
  userId: string;
  title: string;
  description: string;
  amount: number;
  attachment?: string;
};

export function updateExpense({ id, title, description, amount, attachment, userId }: ExpenseUpdateData) {
  return db.expense.update({
    where: { id_userId: { id, userId } },
    data: { title, description, amount, attachment },
  });
}

export function removeAttachmentFromExpense(id: string, userId: string, fileName: string) {
  deleteAttachment(fileName);
  return db.expense.update({
    where: { id_userId: { id, userId } },
    data: { attachment: null },
  });
}

const expenseSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  amount: zod.string(),
});

export function parseExpense(formData: FormData) {
  const data = Object.fromEntries(formData);
  const { title, description, amount } = expenseSchema.parse(data);
  const amountNumber = Number.parseFloat(amount);
  if (Number.isNaN(amountNumber)) {
    throw Error('Invalid amount');
  }
  let attachment: FormDataEntryValue | null | undefined = formData.get('attachment');
  if (!attachment || typeof attachment !== 'string') {
    attachment = undefined;
  }
  return { title, description, amount: amountNumber, attachment };
}
```

The code includes the following reusable functions:

- `createExpense` - Creates a new expense in the database.
- `deleteExpense` - Deletes an expense from the database.
- `updateExpense` - Updates an existing expense in the database.
- `removeAttachmentFromExpense` - Removes an attachment from an expense.
- `parseExpense` - Parses the form data from the expense form using `zod`.

3. **Implement invoice helper functions**

Create a new `app/modules/invoices.server.ts` file and add the following code:

```ts
import zod from 'zod';

import { deleteAttachment } from '~/modules/attachments.server';
import { db } from '~/modules/db.server';

type InvoiceCreateData = {
  title: string;
  description: string;
  amount: number;
  userId: string;
  attachment?: string;
};

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
    },
  });
}

export async function deleteInvoice(id: string, userId: string) {
  const invoice = await db.invoice.delete({ where: { id_userId: { id, userId } } });
  if (invoice.attachment) {
    deleteAttachment(invoice.attachment);
  }
}

type InvoiceUpdateData = {
  id: string;
  userId: string;
  title: string;
  description: string;
  amount: number;
  attachment?: string;
};

export function updateInvoice({ id, title, description, amount, attachment, userId }: InvoiceUpdateData) {
  return db.invoice.update({
    where: { id_userId: { id, userId } },
    data: { title, description, amount, attachment },
  });
}

export function removeAttachmentFromInvoice(id: string, userId: string, fileName: string) {
  deleteAttachment(fileName);
  return db.invoice.update({
    where: { id_userId: { id, userId } },
    data: { attachment: null },
  });
}

const invoiceSchema = zod.object({
  title: zod.string(),
  description: zod.string(),
  amount: zod.string(),
});

export function parseInvoice(formData: FormData) {
  const data = Object.fromEntries(formData);
  const { title, description, amount } = invoiceSchema.parse(data);
  const amountNumber = Number.parseFloat(amount);
  if (Number.isNaN(amountNumber)) {
    throw Error('Invalid amount');
  }
  let attachment: FormDataEntryValue | null | undefined = formData.get('attachment');
  if (!attachment || typeof attachment !== 'string') {
    attachment = undefined;
  }
  return { title, description, amount: amountNumber, attachment };
}
```

The code includes the same functions as the `app/server/expenses.server.ts` file, but for invoice objects instead of expenses.

4. **Update the create expense `action` function**

Now, let's use the `parseExpense`and `createExpense` functions in `app/routes/dashboard.expenses._index.tsx`. Replace the existing `FormData` validation logic and database query in the route module's `action` function with the following code:

```ts
export async function action({ request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const expenseData = parseExpense(formData);
  const expense = await createExpense({ userId, ...expenseData });
  return redirect(`/dashboard/expenses/${expense.id}`);
}
```

5. **Update the create invoice `action` function**

Similarly, replace the existing database query in the `action` function in in `app/routes/dashboard.income._index.tsx` with `createInvoice` and use `parseInvoice` to validate the form data.

You can refer to the code in the [start](./start/) folder if you get stuck.

6. **Rename expense helper functions**

Next, we rename the helper functions in `app/routes/dashboard.expenses.$id._index.tsx`. Currently, the functions are called:

- deleteExpense
- removeAttachment
- updateExpense

Rename them to:

- handleDelete
- handleRemoveAttachment
- handleUpdate

This is to avoid name conflicts with the functions we just created. Additionally, we can think of the route helper functions as action request handlers.

Adding the `handle` prefix creates a nice convention for naming these functions and communicates that they control and handle requests.

7. **Rename invoice helper functions**

Follow the same pattern to rename the helper functions in `app/routes/dashboard.income.$id._index.tsx`.

Refer to the code in the [start](./start/) folder if you get stuck.

8. **Update the `handleDelete` expense route helper function**

Replace the existing `handleDelete` helper function in `app/routes/dashboard.expenses.$id._index.tsx` with the following code:

```tsx
async function handleDelete(request: Request, id: string, userId: string): Promise<Response> {
  const referer = request.headers.get('referer');
  const redirectPath = referer || '/dashboard/expenses';

  try {
    await deleteExpense(id, userId);
  } catch (err) {
    throw new Response('Not found', { status: 404 });
  }

  if (redirectPath.includes(id)) {
    return redirect('/dashboard/expenses');
  }
  return redirect(redirectPath);
}
```

9. **Update the `handleDelete` invoice route helper function**

Do the same for the `handleDelete` helper function in ``app/routes/dashboard.income.$id._index.tsx`.

Refer to the code in the [start](./start/) folder if you get stuck.

10. **Update the `handleUpdate` expense route helper function**

Replace the `handleUpdate` helper function in `app/routes/dashboard.expenses.$id._index.tsx` with the following code:

```tsx
async function handleUpdate(formData: FormData, id: string, userId: string): Promise<Response> {
  const expenseData = parseExpense(formData);
  await updateExpense({ id, userId, ...expenseData });
  return json({ success: true });
}
```

Note how we manage to reduce the amount of boilerplate code in the route modules by using reusable helper functions for data validation and database queries.

11. **Update the `handleUpdate` invoice route helper function**

Also, replace the existing database query and `FormData` validation logic in the `handleUpdate` helper function in `app/routes/dashboard.income.$id._index.tsx`.

Refer to the code in the [start](./start/) folder if you get stuck.

12. **Update the `handleRemoveAttachment` expense route helper function**

Replace the existing `handleRemoveAttachment` helper function in `app/routes/dashboard/expenses/$id/index.tsx` with the following code:

```tsx
async function handleRemoveAttachment(formData: FormData, id: string, userId: string): Promise<Response> {
  const attachmentUrl = formData.get('attachmentUrl');
  if (!attachmentUrl || typeof attachmentUrl !== 'string') {
    throw Error('something went wrong');
  }
  const fileName = attachmentUrl.split('/').pop();
  if (!fileName) throw Error('something went wrong');
  await removeAttachmentFromExpense(id, userId, fileName);
  return json({ success: true });
}
```

13. **Update the `handleRemoveAttachment` invoice route helper function**

Replace the existing database query in the `handleRemoveAttachment` helper function in `app/routes/dashboard/income/$id/index.tsx`.

Great! 🎉 We've refactored our database queries into helper functions. This makes our route modules easier to read and maintain.

Now that we've prepared BeeRich for the next changes to come, let's jump right into _Chapter 11, Optimistic UI_. 💪
