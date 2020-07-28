import React from 'react';
import { Transition } from 'react-transition-group';


function UIAnimationGroup(props) {
  const {
    inProp,
    children,
    duration = 300,
    defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
    },
    transitionStyles = {
      entering: { opacity: 1 },
      entered: { opacity: 1 },
      exiting: { opacity: 0 },
      exited: { opacity: 0 },
    },
    ...otherProps
  } = props;

  return (
    <Transition in={inProp} timeout={duration} {...otherProps}>
      {(state) => (
        <div style={{
          ...defaultStyle,
          ...transitionStyles[state],
        }}
        >
          {children}
        </div>
      )}
    </Transition>
  );
}

export default React.memo(UIAnimationGroup);
