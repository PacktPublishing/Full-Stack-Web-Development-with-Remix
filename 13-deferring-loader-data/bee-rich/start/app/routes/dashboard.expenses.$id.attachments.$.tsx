import type { LoaderFunctionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/router';

import { buildFileResponse } from '~/modules/attachments.server';
import { db } from '~/modules/db.server';
import { requireUserId } from '~/modules/session/session.server';

export async function loader({ request, params }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);
  const { id } = params;
  const slug = params['*'];
  if (!id || !slug) throw Error('id and slug route parameters must be defined');

  const expense = await db.expense.findUnique({ where: { id_userId: { id, userId } } });
  if (!expense || !expense.attachment) throw new Response('Not found', { status: 404 });
  if (slug !== expense.attachment) return redirect(`/dashboard/expenses/${id}/attachments/${expense.attachment}`);
  const headers = new Headers();
  headers.set('ETag', expense.attachment);
  if (request.headers.get('If-None-Match') === expense.attachment) {
    return new Response(null, { status: 304, headers });
  }
  return buildFileResponse(expense.attachment, headers);
}
