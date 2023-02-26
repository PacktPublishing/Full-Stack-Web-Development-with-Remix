/*
 * Shout-out to Gustavo Guichard (gustavoguichard on Twitter) for this awesome progress bar!
 * You can find the original blog post here: https://dev.to/gugaguichard/creating-a-github-like-progress-bar-for-your-remix-app-153l
 */

import { clsx } from 'clsx';
import { useNavigation } from '@remix-run/react';
import { useEffect, useRef, useState } from 'react';

function PageTransitionProgressBar() {
  const ref = useRef<HTMLDivElement>(null);
  const [hasAnimationCompleted, setHasAnimationCompleted] = useState(true);

  const transition = useNavigation();
  const isTransitioning = transition.state !== 'idle';

  useEffect(() => {
    if (!isTransitioning) {
      return;
    }

    async function awaitAnimationCompletion() {
      if (!ref.current) return;
      const runningAnimations = ref.current.getAnimations();
      const animationPromises = runningAnimations.map((animation) => animation.finished);
      await Promise.allSettled(animationPromises);
      setHasAnimationCompleted(true);
    }

    setHasAnimationCompleted(false);
    awaitAnimationCompletion();
  }, [isTransitioning]);

  return (
    <div
      role="progressbar"
      aria-hidden={!isTransitioning}
      aria-valuetext={isTransitioning ? 'Loading' : undefined}
      className="fixed inset-x-0 top-0 left-0 z-50 h-1 animate-pulse"
    >
      <div
        ref={ref}
        className={clsx(
          'h-full bg-gradient-to-r from-primary to-primaryAccent dark:from-darkPrimary dark:to-darkPrimaryAccent transition-all duration-500 ease-in-out',
          transition.state === 'idle' && hasAnimationCompleted && 'w-0 opacity-0 transition-none',
          transition.state === 'submitting' && 'w-4/12',
          transition.state === 'loading' && 'w-10/12',
          transition.state === 'idle' && !hasAnimationCompleted && 'w-full',
        )}
      />
    </div>
  );
}

export { PageTransitionProgressBar };
