import cn from 'classnames';
import React, { memo, useMemo } from 'react';

import { DividerProps } from './types';

import './styles.scss';
import { Icon } from '@components/Icon';

const DividerComponent = ({ children, text, className, direction = 'row' }: DividerProps) => {
  const line = useMemo(
    () => (
      <Icon
        name={direction === 'row' ? 'lineHorizontal' : 'lineVertical'}
        className="rl-divider__line"
      />
    ),
    []
  );

  return (
    <div
      className={cn('rl-divider', className, {
        [`rl-divider_direction_${direction}`]: direction,
      })}
    >
      <div className="rl-divider__inner">
        {line}
        <div className="rl-divider__content">
          {text && <span className="rl-divider__text">{text}</span>}
          {children}
        </div>
        {line}
      </div>
    </div>
  );
};

export const Divider = memo(DividerComponent);
