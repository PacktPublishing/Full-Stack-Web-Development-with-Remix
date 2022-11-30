import { clsx } from 'clsx';
import { Outlet, useTransition } from '@remix-run/react';
import { ListLinkItem } from '~/components/links';
import { H1 } from '~/components/headings';

export default function IncomePage() {
  const transition = useTransition();
  return (
    <div className="w-full">
      <H1>Your income</H1>
      <div className="mt-10 w-full flex flex-col-reverse lg:flex-row">
        <section className="p-8 w-full">
          <h2 className="sr-only">All your income</h2>
          <ul className="flex flex-col">
            <ListLinkItem to={`/dashboard/income/1`}>
              <p className="text-xl font-semibold">Salary October</p>
              <p>$2500</p>
            </ListLinkItem>
            <ListLinkItem to={`/dashboard/income/2`}>
              <p className="text-xl font-semibold">Salary September</p>
              <p>$2500</p>
            </ListLinkItem>
            <ListLinkItem to={`/dashboard/income/3`}>
              <p className="text-xl font-semibold">Salary August</p>
              <p>$2500</p>
            </ListLinkItem>
          </ul>
        </section>
        <section className={clsx('w-full', transition.state === 'loading' && 'motion-safe:animate-pulse')}>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
