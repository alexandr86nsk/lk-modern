import React, { ReactElement, Children, cloneElement, isValidElement } from 'react';
import { Transition } from 'react-transition-group';

const DEFAULT_DURATION = 300;

function getDefaultStyle(duration: number) {
  return {
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0,
    visibility: 'hidden',
  };
}

const transitionStyles = {
  entering: { opacity: 0, visibility: 'visible' },
  entered: { opacity: 1, visibility: 'visible' },
  exiting: { opacity: 0, visibility: 'visible' },
  exited: { opacity: 0, visibility: 'hidden' },
  unmounted: { opacity: 0, visibility: 'hidden' },
};

export type FadeProps = {
  in?: boolean;
  children?: ReactElement | ReactElement[];
  duration?: number;
};

export function Fade({ in: inProp, children, duration = DEFAULT_DURATION }: FadeProps) {
  return (
    <Transition in={inProp} timeout={duration}>
      {(state) => {
        return Children.map(children, (child) => {
          // checking isValidElement is the safe way and avoids a typescript error too
          if (isValidElement(child)) {
            return cloneElement(child, {
              ...child.props,
              style: {
                ...child.props.style,
                ...getDefaultStyle(duration),
                ...transitionStyles[state],
              },
            });
          }
          return child;
        });
      }}
    </Transition>
  );
}
