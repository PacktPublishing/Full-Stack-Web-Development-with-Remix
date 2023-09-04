import type { Expense, Prisma } from '@prisma/client';
import zod from 'zod';

import { deleteAttachment } from '~/modules/attachments.server';
import { db } from '~/modules/db.server';

type ExpenseCreateData = Pick<Expense, 'title' | 'description' | 'amount' | 'attachment' | 'userId'>;

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

type ExpenseUpdateData = Prisma.ExpenseUpdateInput & Prisma.ExpenseIdUserIdCompoundUniqueInput;

export function updateExpense({ id, title, description, amount, attachment, userId }: ExpenseUpdateData) {
  return db.expense.update({
    where: { id_userId: { id, userId } },
    data: { title, description, amount, attachment },
  });
}

export function removeAttachmentFromExpense(id: string, userId: string, fileName: string) {
  deleteAttachment(fileName);
  return updateExpense({ id, userId, attachment: null });
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
  let attachment = formData.get('attachment');
  if (!attachment || typeof attachment !== 'string') {
    attachment = null;
  }
  return { title, description, amount: amountNumber, attachment };
}