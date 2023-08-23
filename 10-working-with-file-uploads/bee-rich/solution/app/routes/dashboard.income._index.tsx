import type { ActionArgs } from '@remix-run/node';
import { redirect, unstable_parseMultipartFormData } from '@remix-run/node';
import { useNavigation } from '@remix-run/react';

import { uploadHandler } from '~/attachments.server';
import { Button } from '~/components/buttons';
import { Form, Input, Textarea } from '~/components/forms';
import { db } from '~/db.server';
import { requireUserId } from '~/session.server';

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const title = formData.get('title');
  const description = formData.get('description');
  const amount = formData.get('amount');
  if (typeof title !== 'string' || typeof description !== 'string' || typeof amount !== 'string') {
    throw Error('something went wrong');
  }
  const amountNumber = Number.parseFloat(amount);
  if (Number.isNaN(amountNumber)) {
    throw Error('something went wrong');
  }
  let attachment = formData.get('attachment');
  if (!attachment || typeof attachment !== 'string') {
    attachment = null;
  }
  const invoice = await db.invoice.create({
    data: {
      title,
      description,
      amount: amountNumber,
      currencyCode: 'USD',
      attachment,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
  return redirect(`/dashboard/income/${invoice.id}`);
}

export default function CreateIncomePage() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  return (
    <Form method="POST" action="/dashboard/income/?index" encType="multipart/form-data">
      <Input label="Title:" type="text" name="title" placeholder="Salary December 2022" required />
      <Textarea label="Description:" name="description" />
      <Input label="Amount (in USD):" type="number" defaultValue={0} name="amount" required />
      <Input label="Attachment" type="file" name="attachment" />
      <Button type="submit" disabled={isSubmitting} isPrimary>
        {isSubmitting ? 'Creating...' : 'Create'}
      </Button>
    </Form>
  );
}
