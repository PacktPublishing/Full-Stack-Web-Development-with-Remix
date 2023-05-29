import type { Expense, Prisma } from '@prisma/client';
import zod from 'zod';
import { db } from '~/db.server';
import { deleteAttachment } from '~/attachments.server';

type ExpenseCreateData = Pick<Expense, 'title' | 'description' | 'amount' | 'attachment' | 'userId'>;

export async function createExpense({ title, description, amount, attachment, userId }: ExpenseCreateData) {
  const expense = await db.expense.create({
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
  createExpenseLog(userId, expense.id, { title, description, amount, currencyCode: 'USD' });
  return expense;
}

export async function deleteExpense(id: string, userId: string) {
  const expense = await db.expense.delete({ where: { id_userId: { id, userId } } });
  if (expense.attachment) {
    deleteAttachment(expense.attachment);
  }
}

type ExpenseUpdateData = Prisma.ExpenseUpdateInput & Prisma.ExpenseIdUserIdCompoundUniqueInput;

export async function updateExpense({ id, title, description, amount, attachment, userId }: ExpenseUpdateData) {
  const expense = await db.expense.update({
    where: { id_userId: { id, userId } },
    data: { title, description, amount, attachment },
  });
  createExpenseLog(userId, expense.id, expense);
  return expense;
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

type ExpenseLogCreateData = Pick<Expense, 'title' | 'description' | 'amount' | 'currencyCode'>;

async function createExpenseLog(userId: string, expenseId: string, data: ExpenseLogCreateData) {
  return db.expenseLog.create({
    data: {
      ...data,
      user: { connect: { id: userId } },
      expense: { connect: { id: expenseId } },
    },
  });
}
