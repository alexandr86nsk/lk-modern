import cn from 'classnames';
import React, { memo } from 'react';

import { WaveSpinner } from './spinners/WaveSpinner';

import './style.scss';

const spinnerTypes = {
  wave: <WaveSpinner />,
};

const DOTS = ['dot_01', 'dot_02', 'dot_03'];

export type LoaderProps = {
  /**
   * Дополнительный className для компонента
   */
  className?: string;
  /**
   * Заголовок компонента
   */
  title?: string;
  /**
   * Направление компонента
   */
  position?: 'horizontal' | 'vertical';
  /**
   * Тип загрузчика
   */
  type?: 'wave';
  /**
   * Флаг наличия области затемнения
   */
  dimmed?: boolean;
  /**
   * Флаг наличия троеточия с анимацией в конце заголовка
   */
  hideTitleDots?: boolean;
};

function LoaderComponent({
  title,
  position = 'horizontal',
  type,
  dimmed,
  hideTitleDots,
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
          {title && (
            <div className="rl-loader__title">
              <span className="rl-loader__text">{title}</span>
              {!hideTitleDots &&
                DOTS.map((dot) => (
                  <span key={dot} className="rl-loader__dot">
                    .
                  </span>
                ))}
            </div>
          )}
        </div>
      </div>
      {dimmed && <div className="rl-loader__dimmer" />}
    </div>
  );
}

export const Loader = memo(LoaderComponent);
