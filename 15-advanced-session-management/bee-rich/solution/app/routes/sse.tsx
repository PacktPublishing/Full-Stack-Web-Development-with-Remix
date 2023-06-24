import type { LoaderArgs } from '@remix-run/node';
import type { OnSetup } from '~/server/events.server';
import { eventStream, emitter } from '~/server/events.server';
import { requireUserId } from '~/session.server';

export async function loader({ request }: LoaderArgs) {
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
