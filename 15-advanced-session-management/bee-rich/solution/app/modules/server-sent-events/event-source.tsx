import { useRevalidator } from '@remix-run/react';
import { useEffect } from 'react';

export function useEventSource() {
  const { revalidate } = useRevalidator();

  useEffect(() => {
    function handler(event: MessageEvent) {
      console.log(`Received server event [${new Date().toLocaleTimeString()}]`, event.data);
      revalidate();
    }

    const eventSource = new EventSource('/sse');
    eventSource.addEventListener('server-change', handler);

    return () => {
      eventSource.removeEventListener('server-change', handler);
      eventSource.close();
    };
  }, [revalidate]);
}
