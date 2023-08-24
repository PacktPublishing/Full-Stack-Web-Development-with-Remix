import { Outlet, useNavigation } from '@remix-run/react';
import { clsx } from 'clsx';

import { H1 } from '~/components/headings';
import { ListLinkItem } from '~/components/links';

export default function Component() {
  const navigation = useNavigation();
  return (
    <div className="w-full">
      <H1>Your income</H1>
      <div className="mt-10 w-full flex flex-col-reverse lg:flex-row">
        <section className="lg:p-8 w-full lg:max-w-2xl">
          <h2 className="sr-only">All your income</h2>
          <ul className="flex flex-col">
            <ListLinkItem to="/dashboard/income/1">
              <p className="text-xl font-semibold">Salary October</p>
              <p>$2500</p>
            </ListLinkItem>
            <ListLinkItem to="/dashboard/income/2">
              <p className="text-xl font-semibold">Salary September</p>
              <p>$2500</p>
            </ListLinkItem>
            <ListLinkItem to="/dashboard/income/3">
              <p className="text-xl font-semibold">Salary August</p>
              <p>$2500</p>
            </ListLinkItem>
          </ul>
        </section>
        <section className={clsx('lg:p-8 w-full', navigation.state === 'loading' && 'motion-safe:animate-pulse')}>
          <Outlet />
        </section>
      </div>
    </div>
  );
}
