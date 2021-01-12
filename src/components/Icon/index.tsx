import cn from 'classnames';
import React, { memo, useCallback, useRef } from 'react';

import { useRippleEffect } from '@src/hooks';

import { icons } from './icons';
import { IconProps } from './types';

import './styles.scss';

function IconComponent({
  className,
  onClick,
  isCompact,
  isCircle,
  hasRipple,
  isInteractive,
  title,
  size,
  name,
}: IconProps) {
  const containerRef = useRef(null);

  useRippleEffect(containerRef, hasRipple);

  const onClickHandler = useCallback(
    (event) => {
      if (onClick) {
        onClick(event);
      }
    },
    [onClick]
  );

  return name ? (
    <div
      ref={containerRef}
      role="presentation"
      className={cn('rl-icon', className, {
        'rl-icon_type_interactive': onClick || isInteractive,
        'rl-icon_type_compact': isCompact,
        'rl-icon_type_circle': isCircle,
        [`rl-icon_size_${size}`]: size,
      })}
      title={title}
      onClick={onClickHandler}
    >
      {icons[name]}
    </div>
  ) : null;
}

export const Icon = memo(IconComponent);
