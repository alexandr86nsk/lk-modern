import cn from 'classnames';
import React, { memo } from 'react';

import logo from '@assets/images/logo/logo.png';
import logoWp from '@assets/images/logo/logo.webp';

import './styles.scss';

export type LogoProps = {
  /**
   * Дополнительный className для компонента
   */
  className?: string;
  /**
   * Направление компонента
   */
  position?: 'horizontal' | 'vertical';
  /**
   * Флаг для скрытия заголовка
   */
  hideTitle?: boolean;
};

function LogoComponent({ position = 'horizontal', hideTitle, className }: LogoProps) {
  return (
    <div
      className={cn('rl-logo', className, {
        [`rl-logo_position_${position}`]: position,
      })}
    >
      <picture className="rl-logo__image">
        <source srcSet={logoWp} type="image/webp" />
        <source srcSet={logo} type="image/jpeg" />
        <img src={logo} alt="logo" />
      </picture>
      {!hideTitle && (
        <h2 className="rl-logo__title">
          <span>Real</span>
          <span>apps</span>
        </h2>
      )}
    </div>
  );
}

export const Logo = memo(LogoComponent);
