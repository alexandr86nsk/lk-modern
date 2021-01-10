import cn from 'classnames';
import React, { memo } from 'react';

import { WaveSpinner } from './spinners/WaveSpinner';
import { LoaderProps } from './types';

import './styles.scss';

const dots = ['dot_01', 'dot_02', 'dot_03'];

const spinnerTypes = {
  wave: <WaveSpinner />,
};

function LoaderComponent({
  text,
  position = 'horizontal',
  type,
  isDimmed,
  isDotsHidden,
  className,
}: LoaderProps) {
  return (
    <div
      className={cn('rl-loader', className, {
        [`rl-loader_position_${position}`]: position,
        'rl-loader_type_basic': !type,
      })}
    >
      <div className="rl-loader__inner">
        <div className="rl-loader__content">
          {type && spinnerTypes[type]}
          {text && (
            <div className="rl-loader__wrapper">
              <span className="rl-loader__text">{text}</span>
              {!isDotsHidden &&
                dots.map((dot) => (
                  <span key={dot} className="rl-loader__dot">
                    .
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
      {isDimmed && <div className="rl-loader__dimmer" />}
    </div>
  );
}

export const Loader = memo(LoaderComponent);
