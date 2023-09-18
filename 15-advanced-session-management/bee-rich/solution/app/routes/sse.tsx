import type { LoaderFunctionArgs } from '@remix-run/node';

import type { OnSetup } from '~/modules/server-sent-events/events.server';
import { emitter, eventStream } from '~/modules/server-sent-events/events.server';
import { requireUserId } from '~/modules/session/session.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const userId = await requireUserId(request);

  const onSetup: OnSetup = (send) => {
    function handler() {
      send('server-change', `Data change for ${userId}`);
    }
    emitter.addListener(userId, handler);
    return () => {
      emitter.removeListener(userId, handler);
    };
  };

  return eventStream(request, onSetup);
}
