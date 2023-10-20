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
