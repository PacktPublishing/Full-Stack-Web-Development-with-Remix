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

  const invoice = await db.invoice.findUnique({ where: { id_userId: { id, userId } } });
  if (!invoice || !invoice.attachment) throw new Response('Not found', { status: 404 });
  if (slug !== invoice.attachment) return redirect(`/dashboard/income/${id}/attachments/${invoice.attachment}`);
  const headers = new Headers();
  headers.set('ETag', invoice.attachment);
  if (request.headers.get('If-None-Match') === invoice.attachment) {
    return new Response(null, { status: 304, headers });
  }
  return buildFileResponse(invoice.attachment, headers);
}
