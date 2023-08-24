import type { ActionArgs } from '@remix-run/node';
import { redirect } from '@remix-run/node';

import { logout } from '~/modules/session/session.server';

export function action({ request }: ActionArgs) {
  return logout(request);
}

export function loader() {
  return redirect('/login');
}
