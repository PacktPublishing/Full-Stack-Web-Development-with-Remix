import type { ExpenseLog } from '@prisma/client';
import type { ActionArgs, LoaderArgs, SerializeFrom } from '@remix-run/node';
import { defer, redirect, json, unstable_parseMultipartFormData } from '@remix-run/node';
import {
  useActionData,
  useLoaderData,
  useParams,
  useNavigation,
  Await,
  useRouteError,
  isRouteErrorResponse,
} from '@remix-run/react';
import { Suspense } from 'react';
import { uploadHandler } from '~/attachments.server';
import { Button } from '~/components/buttons';
import { Attachment, Form, Input, Textarea } from '~/components/forms';
import { H2, H3 } from '~/components/headings';
import { FloatingActionLink } from '~/components/links';
import { db } from '~/db.server';
import { deleteExpense, parseExpense, removeAttachmentFromExpense, updateExpense } from '~/server/expenses.server';
import { requireUserId } from '~/session.server';

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

async function handleUpdate(formData: FormData, id: string, userId: string): Promise<Response> {
  const expenseData = parseExpense(formData);
  await updateExpense({ id, userId, ...expenseData });
  return json({ success: true });
}

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
  const expense = await db.expense.findUnique({ where: { id_userId: { id, userId } } });
  if (!expense) throw new Response('Not found', { status: 404 });
  const expenseLogs = db.expenseLog
    .findMany({
      orderBy: { createdAt: 'desc' },
      where: { expenseId: id, userId },
    })
    .then((expense) => expense);
  return defer({ expense, expenseLogs });
}

export default function ExpenseDetailsPage() {
  const { expense, expenseLogs } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const actionData = useActionData<typeof action>();
  const isUploadingAttachment = !!navigation.formData?.get('attachment');
  const isRemovingAttachment = navigation.formData?.get('intent') === 'remove-attachment';
  return (
    <>
      <Form
        method="post"
        action={`/dashboard/expenses/${expense.id}?index`}
        key={expense.id}
        encType="multipart/form-data"
      >
        <Input label="Title:" type="text" name="title" defaultValue={expense.title} required />
        <Textarea label="Description:" name="description" defaultValue={expense.description || ''} />
        <Input label="Amount (in USD):" type="number" defaultValue={expense.amount} name="amount" required />
        {(isUploadingAttachment || expense.attachment) && !isRemovingAttachment ? (
          <Attachment
            label="Current Attachment"
            attachmentUrl={`/dashboard/expenses/${expense.id}/attachments/${expense.attachment}`}
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
      <Suspense fallback="Loading expense history...">
        <Await resolve={expenseLogs} errorElement="There was an error loading the expense history. Please try again.">
          {(resolvedExpenseLogs) => <ExpenseLogSection expenseLogs={resolvedExpenseLogs} />}
        </Await>
      </Suspense>
      <FloatingActionLink to="/dashboard/expenses/">Add expense</FloatingActionLink>
    </>
  );
}

function ExpenseLogSection({ expenseLogs }: { expenseLogs: SerializeFrom<ExpenseLog[]> }) {
  return (
    <section className="my-5 w-full m-auto lg:max-w-3xl flex flex-col items-center justify-center gap-5">
      <H3>Expense History</H3>
      <ul className="space-y-2 max-h-[300px] lg:max-h-max overflow-y-scroll lg:overflow-hidden py-5">
        {expenseLogs.map((expenseLog) => (
          <li key={expenseLog.id}>
            <p>
              <b>
                {`${expenseLog.title} - ${Intl.NumberFormat('en-US', {
                  style: 'currency',
                  currency: expenseLog.currencyCode,
                }).format(expenseLog.amount)}`}
              </b>
            </p>
            {expenseLog.description && (
              <p>
                <i>{expenseLog.description}</i>
              </p>
            )}
            <p className="text-sm text-gray-500">
              {`${new Date(expenseLog.createdAt).toLocaleDateString()} ${new Date(
                expenseLog.createdAt,
              ).toLocaleTimeString()}`}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const { id } = useParams();

  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <div className="w-full m-auto lg:max-w-3xl flex flex-col items-center justify-center gap-5">
          <H2>Expense not found</H2>
          <p>Apologies, the expense with the id {id} cannot be found.</p>
        </div>
        <FloatingActionLink to="/dashboard/expenses/">Add expense</FloatingActionLink>
      </>
    );
  }

  return (
    <>
      <div className="w-full m-auto lg:max-w-3xl flex flex-col items-center justify-center gap-5">
        <H2>Something went wrong</H2>
        <p>Apologies, something went wrong on our end, please try again.</p>
      </div>
      <FloatingActionLink to="/dashboard/expenses/">Add expense</FloatingActionLink>
    </>
  );
}
