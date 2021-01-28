import React, { Children, cloneElement, isValidElement, memo } from 'react';
import { Transition } from 'react-transition-group';

import { TransitionEffectProps } from '@components/TransitionEffect';

const DEFAULT_DURATION = 300;

const transitionStyles = {
  fade: {
    transition: {
      entering: { opacity: 0, visibility: 'visible' },
      entered: { opacity: 1, visibility: 'visible' },
      exiting: { opacity: 0, visibility: 'visible' },
      exited: { opacity: 0, visibility: 'hidden' },
      unmounted: { opacity: 0, visibility: 'hidden' },
    },
    default: (duration: number) => {
      return {
        transition: `opacity ${duration}ms ease-in-out`,
        opacity: 0,
        visibility: 'hidden',
      };
    },
  },
};

const TransitionEffectComponent = ({
  animation = 'fade',
  in: inProp,
  children,
  unmountOnExit,
  mountOnEnter,
  duration = DEFAULT_DURATION,
  onEnter,
  onEntered,
  onExited,
}: TransitionEffectProps) => {
  return (
    <Transition
      in={inProp}
      timeout={duration}
      unmountOnExit={unmountOnExit}
      mountOnEnter={mountOnEnter}
      onEnter={onEnter}
      onEntered={onEntered}
      onExited={onExited}
    >
      {(state) => {
        return Children.map(children, (child) => {
          // checking isValidElement is the safe way and avoids a typescript error too
          if (isValidElement(child)) {
            return cloneElement(child, {
              ...child.props,
              style: {
                ...child.props.style,
                ...transitionStyles[animation]?.default(duration),
                ...transitionStyles[animation]?.transition[state],
              },
            });
          }
          return child;
        });
      }}
    </Transition>
  );
};

export const TransitionEffect = memo(TransitionEffectComponent);
