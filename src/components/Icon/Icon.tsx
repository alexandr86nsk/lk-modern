import cn from 'classnames';
import React, { memo } from 'react';

import { icons } from './icons';
import { IconProps } from './types';

import './styles.scss';

const IconComponent = ({ className, title, size, name, isCircular }: IconProps) => {
  return (
    <div
      className={cn('rl-icon', className, {
        'rl-icon_type_circular': isCircular,
        [`rl-icon_size_${size}`]: size,
      })}
      title={title}
    >
      {icons[name]}
    </div>
  );
};

export const Icon = memo(IconComponent);
