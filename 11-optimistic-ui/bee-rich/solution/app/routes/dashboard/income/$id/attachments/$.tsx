import type { LoaderArgs } from '@remix-run/node';
import { redirect } from '@remix-run/router';

import { buildFileResponse } from '~/attachments.server';
import { db } from '~/db.server';
import { requireUserId } from '~/session.server';

export async function loader({ request, params }: LoaderArgs) {
  const userId = await requireUserId(request);
  const { id } = params;
  const slug = params['*'];
  if (!id || !slug) throw Error('id and slug route parameters must be defined');

  const invoice = await db.invoice.findUnique({ where: { id_userId: { id, userId } } });
  if (!invoice || !invoice.attachment) throw new Response('Not found', { status: 404 });
  if (slug !== invoice.attachment) return redirect(`/dashboard/income/${id}/attachments/${invoice.attachment}`);
  return buildFileResponse(invoice.attachment);
}
