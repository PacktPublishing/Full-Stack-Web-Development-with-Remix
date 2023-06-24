import type { ActionArgs, LoaderArgs } from '@remix-run/node';
import { unstable_parseMultipartFormData } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useActionData, useLoaderData, useNavigation } from '@remix-run/react';
import { uploadHandler } from '~/attachments.server';
import { Button } from '~/components/buttons';
import { Attachment, Form, Input, Textarea } from '~/components/forms';
import { FloatingActionLink } from '~/components/links';
import { db } from '~/db.server';
import { deleteInvoice, parseInvoice, removeAttachmentFromInvoice, updateInvoice } from '~/server/invoices.server';
import { requireUserId } from '~/session.server';
import { emitter } from '~/server/events.server';

async function handleDelete(request: Request, id: string, userId: string): Promise<Response> {
  const referer = request.headers.get('referer');
  const redirectPath = referer || '/dashboard/income';

  try {
    await deleteInvoice(id, userId);
  } catch (err) {
    throw new Response('Not found', { status: 404 });
  }

  emitter.emit(userId);
  if (redirectPath.includes(id)) {
    return redirect('/dashboard/income');
  }
  return redirect(redirectPath);
}

async function handleUpdate(formData: FormData, id: string, userId: string): Promise<Response> {
  const invoiceData = parseInvoice(formData);
  await updateInvoice({ id, userId, ...invoiceData });
  emitter.emit(userId);
  return json({ success: true });
}

async function handleRemoveAttachment(formData: FormData, id: string, userId: string): Promise<Response> {
  const attachmentUrl = formData.get('attachmentUrl');
  if (!attachmentUrl || typeof attachmentUrl !== 'string') {
    throw Error('something went wrong');
  }
  const fileName = attachmentUrl.split('/').pop();
  if (!fileName) throw Error('something went wrong');
  await removeAttachmentFromInvoice(id, userId, fileName);
  emitter.emit(userId);
  return json({ success: true });
}

export async function action({ params, request }: ActionArgs) {
  const userId = await requireUserId(request);
  const { id } = params;
  if (!id) throw Error('id route parameter must be defined');

  let formData: FormData;
  const contentType = request.headers.get('content-type');
  if (contentType?.toLowerCase().includes('multipart/form-data')) {
    formData = await unstable_parseMultipartFormData(request, uploadHandler);
  } else {
    formData = await request.formData();
  }

  const intent = formData.get('intent');
  if (intent === 'delete') {
    return handleDelete(request, id, userId);
  }
  if (intent === 'update') {
    return handleUpdate(formData, id, userId);
  }
  if (intent === 'remove-attachment') {
    return handleRemoveAttachment(formData, id, userId);
  }
  throw new Response('Bad request', { status: 400 });
}

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  const { id } = params;
  if (!id) throw Error('id route parameter must be defined');
  const invoice = await db.invoice.findUnique({ where: { id_userId: { id, userId } } });
  if (!invoice) throw new Response('Not found', { status: 404 });
  return json(invoice);
}

export default function IncomeDetailsPage() {
  const invoice = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const actionData = useActionData<typeof action>();
  const isUploadingAttachment = !!navigation.formData?.get('attachment');
  const isRemovingAttachment = navigation.formData?.get('intent') === 'remove-attachment';
  return (
    <>
      <Form
        method="post"
        action={`/dashboard/income/${invoice.id}?index`}
        key={invoice.id}
        encType="multipart/form-data"
      >
        <Input label="Title:" type="text" name="title" defaultValue={invoice.title} required />
        <Textarea label="Description:" name="description" defaultValue={invoice.description || ''} />
        <Input label="Amount (in USD):" type="number" defaultValue={invoice.amount} name="amount" required />
        {(isUploadingAttachment || invoice.attachment) && !isRemovingAttachment ? (
          <Attachment
            label="Current Attachment"
            attachmentUrl={`/dashboard/income/${invoice.id}/attachments/${invoice.attachment}`}
            disabled={isUploadingAttachment}
          />
        ) : (
          <Input label="New Attachment" type="file" name="attachment" disabled={isSubmitting} />
        )}
        <Button type="submit" name="intent" value="update" isPrimary>
          Save
        </Button>
        <p aria-live="polite" className="text-green-600">
          {actionData?.success && 'Changes saved!'}
        </p>
      </Form>
      <FloatingActionLink to="/dashboard/income/">Add invoice</FloatingActionLink>
    </>
  );
}
