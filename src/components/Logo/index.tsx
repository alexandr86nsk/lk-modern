import cn from 'classnames';
import React, { memo } from 'react';

import logo from '@assets/images/logo/logo.png';
import logoWp from '@assets/images/logo/logo.webp';

import { LogoProps } from './types';

import './styles.scss';

function LogoComponent({ position = 'horizontal', isTitleHidden, className }: LogoProps) {
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
      {!isTitleHidden && (
        <h2 className="rl-logo__title">
          <span>Real</span>
          <span>apps</span>
        </h2>
      )}
    </div>
  );
}

export const Logo = memo(LogoComponent);
