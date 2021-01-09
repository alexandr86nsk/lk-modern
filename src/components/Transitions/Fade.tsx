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
  /**
   * Флаг для начала анимации для появления компонента
   */
  in?: boolean;
  /**
   * Внутренние компоненты
   */
  children?: ReactElement | ReactElement[];
  /**
   * Длительность анимации появления
   */
  duration?: number;
  /**
   * Удаление компонента после выхода
   */
  unmountOnExit?: boolean;
  /**
   * Callback fired before the "entering" status is applied.
   * An extra parameter isAppearing is supplied to indicate
   * if the enter stage is occurring on the initial mount
   */
  mountOnEnter?: boolean;
  /**
   * Callback fired after the "entered" status is applied.
   * An extra parameter isAppearing is supplied to indicate
   * if the enter stage is occurring on the initial mount
   */
  onEnter?: (node: HTMLElement, isAppearing: boolean) => void;
  /**
   * Callback fired after the "entered" status is applied.
   * An extra parameter isAppearing is supplied to indicate
   * if the enter stage is occurring on the initial mount
   */
  onEntered?: (node: HTMLElement, isAppearing: boolean) => void;
  /**
   * Callback fired after the "exited" status is applied.
   */
  onExited?: (node: HTMLElement) => void;
};

export function Fade({
  in: inProp,
  children,
  unmountOnExit,
  mountOnEnter,
  duration = DEFAULT_DURATION,
  onEnter,
  onEntered,
  onExited,
}: FadeProps) {
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
