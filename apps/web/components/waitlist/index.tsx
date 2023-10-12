'use client';

import { Suspense, lazy } from 'react';

const Waitlist = lazy(() => import('./Waitlist'));

const SuspendedWaitlist = () => (
  <Suspense fallback='...loading'>
    <Waitlist />
  </Suspense>
);

export default SuspendedWaitlist;
