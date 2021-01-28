import cn from 'classnames';
import React, { memo, useCallback, useRef, useMemo } from 'react';

import { useRippleEffect } from '@src/hooks';
import { isDefined } from '@src/utils';

import { Icon } from '@components/Icon/Icon';
import { Loader } from '@components/Loader/Loader';

import { ButtonProps } from './types';

import './styles.scss';

const ButtonComponent = ({
  text,
  className,
  onClick,
  title,
  size,
  theme,
  icon,
  iconPosition = 'left',
  iconIsLabeled,
  hasRipple,
  isCircular,
  isFluid,
  isLoading,
  isCompact,
  isInverted,
  isOutline,
  isGhost,
  isDisabled,
  children,
}: ButtonProps) => {
  const containerRef = useRef(null);

  useRippleEffect(containerRef, hasRipple && !isLoading && !isDisabled);

  const onClickHandler = useCallback(
    (event) => {
      const canClick = !isDisabled && !isLoading;
      if (canClick && isDefined(onClick)) {
        onClick(event);
      }
    },
    [onClick, isDisabled, isLoading]
  );

  const memoizedIcon = useMemo(() => icon && <Icon className="rl-button__icon" name={icon} />, [
    icon,
  ]);

  return (
    <button
      ref={containerRef}
      className={cn('rl-button', className, {
        'rl-button_type_circular': isCircular,
        'rl-button_type_fluid': isFluid,
        'rl-button_type_loading': isLoading,
        'rl-button_type_icon': icon && !text,
        'rl-button_type_compact': isCompact,
        'rl-button_type_labeled': iconIsLabeled,
        'rl-button_type_inverted': isInverted,
        'rl-button_type_outline': isOutline,
        'rl-button_type_ghost': isGhost,
        'rl-button_type_disabled': isDisabled,
        [`rl-button_theme_${theme}`]: theme,
        [`rl-button_size_${size}`]: size,
      })}
      title={title}
      onClick={onClickHandler}
      disabled={isDisabled || isLoading}
    >
      <div className="rl-button__inner">
        {iconPosition === 'left' && memoizedIcon}
        {text && <span className="rl-button__text">{text}</span>}
        {children}
        {iconPosition === 'right' && memoizedIcon}
      </div>
      {isLoading && <Loader />}
    </button>
  );
};

export const Button = memo(ButtonComponent);
