import type { ActionArgs } from '@remix-run/node';
import { redirect, unstable_parseMultipartFormData } from '@remix-run/node';
import { useNavigation } from '@remix-run/react';
import { uploadHandler } from '~/attachments.server';
import { Button } from '~/components/buttons';
import { Form, Input, Textarea } from '~/components/forms';
import { createInvoice, parseInvoice } from '~/server/invoices.server';
import { requireUserId } from '~/session.server';

export async function action({ request }: ActionArgs) {
  const userId = await requireUserId(request);
  const formData = await unstable_parseMultipartFormData(request, uploadHandler);
  const invoiceData = parseInvoice(formData);
  const invoice = await createInvoice({ userId, ...invoiceData });
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
