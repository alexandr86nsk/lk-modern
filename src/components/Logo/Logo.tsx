import cn from 'classnames';
import React, { memo } from 'react';

import logo from '@assets/images/logo/target.png';
import logoWp from '@assets/images/logo/target.webp';

import { LogoProps } from './types';

import './styles.scss';

const LogoComponent = ({ direction = 'row', isTitleHidden, className }: LogoProps) => {
  return (
    <div
      className={cn('rl-logo', className, {
        [`rl-logo_direction_${direction}`]: direction,
      })}
    >
      <picture className="rl-logo__image">
        <source srcSet={logoWp} type="image/webp" />
        <source srcSet={logo} type="image/jpeg" />
        <img src={logo} alt="logo" />
      </picture>
      {!isTitleHidden && (
        <h2 className="rl-logo__title">
          <span>Planning</span>
          <span>craft</span>
        </h2>
      )}
    </div>
  );
};

export const Logo = memo(LogoComponent);
