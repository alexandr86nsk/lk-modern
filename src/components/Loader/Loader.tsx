import cn from 'classnames';
import React, { memo } from 'react';

import { BasicSpinner } from './spinners/BasicSpinner';
import { WaveSpinner } from './spinners/WaveSpinner';
import { LoaderProps } from './types';

import './styles.scss';

const spinnerTypes = {
  basic: <BasicSpinner />,
  wave: <WaveSpinner />,
};

const LoaderComponent = ({
  text,
  position = 'absolute',
  direction = 'row',
  type = 'basic',
  isDimmed,
  className,
}: LoaderProps) => {
  return (
    <div
      className={cn('rl-loader', className, {
        [`rl-loader_direction_${direction}`]: direction,
        [`rl-loader_position_${position}`]: position,
        [`rl-loader_type_${type}`]: type,
        'rl-loader_type_dimmed': isDimmed,
      })}
    >
      <div className="rl-loader__inner">
        <div className="rl-loader__spinner">{spinnerTypes[type]}</div>
        {text && <span className="rl-loader__text">{text}</span>}
      </div>
    </div>
  );
};

export const Loader = memo(LoaderComponent);
