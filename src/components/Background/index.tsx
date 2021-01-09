import cn from 'classnames';
import React, { memo } from 'react';

import './style.scss';

export type BackgroundProps = {
  /**
   * Дополнительный className для компонента
   */
  className?: string;
  /**
   * Тема для компонента
   */
  theme?: 'magenta';
  /**
   * Флаг для добавления изображений по углам компонента
   */
  hasCorners?: boolean;
};

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
