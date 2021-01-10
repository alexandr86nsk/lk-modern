import cn from 'classnames';
import React, { memo } from 'react';

import { BackgroundProps } from '@components/Background/types';

import './styles.scss';

function BackgroundComponent({ theme, hasCorners, className }: BackgroundProps) {
  return (
    <div
      className={cn('rl-background', className, {
        [`rl-background_theme_${theme}`]: theme,
        'rl-background_type_corners': hasCorners,
      })}
    >
      <div className="rl-background__inner" />
    </div>
  );
}

export const Background = memo(BackgroundComponent);
