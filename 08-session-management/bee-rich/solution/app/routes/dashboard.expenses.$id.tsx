import type { ActionFunctionArgs, LoaderFunctionArgs } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import {
  isRouteErrorResponse,
  useActionData,
  useLoaderData,
  useNavigation,
  useParams,
  useRouteError,
} from '@remix-run/react';

import { Button } from '~/components/buttons';
import { Form, Input, Textarea } from '~/components/forms';
import { H2 } from '~/components/headings';
import { FloatingActionLink } from '~/components/links';
import { db } from '~/modules/db.server';
import { requireUserId } from '~/modules/session/session.server';

async function deleteExpense(request: Request, id: string, userId: string): Promise<Response> {
  const referer = request.headers.get('referer');
  const redirectPath = referer || '/dashboard/expenses';

  try {
    await db.expense.delete({ where: { id_userId: { id, userId } } });
  } catch (err) {
    throw new Response('Not found', { status: 404 });
  }

  if (redirectPath.includes(id)) {
    return redirect('/dashboard/expenses');
  }
  return redirect(redirectPath);
}

async function updateExpense(formData: FormData, id: string, userId: string): Promise<Response> {
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
  await db.expense.update({
    where: { id_userId: { id, userId } },
    data: { title, description, amount: amountNumber },
  });
  return json({ success: true });
}

export async function action({ params, request }: ActionFunctionArgs) {
  const userId = await requireUserId(request);
  const { id } = params;
  if (!id) throw Error('id route parameter must be defined');

  const formData = await request.formData();
  const intent = formData.get('intent');
  if (intent === 'delete') {
    return deleteExpense(request, id, userId);
  }
  if (intent === 'update') {
    return updateExpense(formData, id, userId);
  }
  throw new Response('Bad request', { status: 400 });
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const { id } = params;
  if (!id) throw Error('id route parameter must be defined');
  const expense = await db.expense.findUnique({ where: { id_userId: { id, userId } } });
  if (!expense) throw new Response('Not found', { status: 404 });
  return json(expense);
}

export default function Component() {
  const expense = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== 'idle' && navigation.formAction === `/dashboard/expenses/${expense.id}`;
  const actionData = useActionData<typeof action>();

  return (
    <>
      <Form method="POST" action={`/dashboard/expenses/${expense.id}`} key={expense.id}>
        <Input label="Title:" type="text" name="title" defaultValue={expense.title} required />
        <Textarea label="Description:" name="description" defaultValue={expense.description || ''} />
        <Input label="Amount (in USD):" type="number" defaultValue={expense.amount} name="amount" required />
        <Button type="submit" name="intent" value="update" disabled={isSubmitting} isPrimary>
          {isSubmitting ? 'Save...' : 'Save'}
        </Button>
        <p aria-live="polite" className="text-green-600">
          {actionData?.success && 'Changes saved!'}
        </p>
      </Form>
      <FloatingActionLink to="/dashboard/expenses/">Add expense</FloatingActionLink>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const { id } = useParams();
  let heading = 'Something went wrong';
  let message = `Apologies, something went wrong on our end, please try again.`;
  if (isRouteErrorResponse(error) && error.status === 404) {
    heading = 'Expense not found';
    message = `Apologies, the expense with the id ${id} cannot be found.`;
  }
  return (
    <>
      <div className="w-full m-auto lg:max-w-3xl flex flex-col items-center justify-center gap-5">
        <H2>{heading}</H2>
        <p>{message}</p>
      </div>
      <FloatingActionLink to="/dashboard/expenses/">Add expense</FloatingActionLink>
    </>
  );
}
