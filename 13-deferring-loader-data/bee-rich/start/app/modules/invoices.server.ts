import type { Invoice } from '@prisma/client';
import zod from 'zod';

import { deleteAttachment } from '~/modules/attachments.server';
import { db } from '~/modules/db.server';

type InvoiceCreateData = Pick<Invoice, 'title' | 'description' | 'amount' | 'attachment' | 'userId'>;

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

export async function deleteInvoice(id: string, userId: string) {
  const invoice = await db.invoice.delete({ where: { id_userId: { id, userId } } });
  if (invoice.attachment) {
    deleteAttachment(invoice.attachment);
  }
}

type InvoiceUpdateData = InvoiceCreateData & Pick<Invoice, 'id'>;

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
  let attachment = formData.get('attachment');
  if (!attachment || typeof attachment !== 'string') {
    attachment = null;
  }
  return { title, description, amount: amountNumber, attachment };
}
