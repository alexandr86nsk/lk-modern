import React, { memo, useMemo } from 'react';

import { isNotEmptyArray, emptyValueChecker } from '@src/utils';

import { Button } from '@components/Button';
import { Icon } from '@components/Icon/Icon';

import { FieldInfoProps } from './types';

import './styles.scss';

function FieldInfoComponent({
  type,
  isReadOnly,
  isDisabled,
  value,
  onClearClick,
  passVisibility,
  onChangePassVisibilityClick,
  isShowErrors,
  errors,
}: FieldInfoProps) {
  const isEmpty = useMemo(() => {
    return emptyValueChecker(value);
  }, [value]);

  return (
    <div className="rl-field__info">
      {!isDisabled && !isReadOnly && (
        <>
          {!isEmpty && (
            <Button
              className="rl-field__btn rl-field__btn_type_clear"
              icon="close"
              title="Очистить"
              onClick={onClearClick}
              isGhost
              isCircular
              isCompact
            />
          )}
          {type === 'password' && (
            <Button
              className="rl-field__btn rl-field__btn_type_visibility"
              icon={passVisibility ? 'visibilityOff' : 'visibilityOn'}
              title={passVisibility ? 'Скрыть' : 'Показать'}
              onClick={onChangePassVisibilityClick}
              isGhost
              isCircular
              isCompact
            />
          )}
          {isShowErrors && isNotEmptyArray(errors) && (
            <Icon
              className="rl-field__icon rl-field__icon_type_error"
              name="errorOutline"
              isCircular
            />
          )}
          {isShowErrors && !isEmpty && !isNotEmptyArray(errors) && (
            <Icon className="rl-field__icon rl-field__icon_type_success" name="check" isCircular />
          )}
        </>
      )}
      {type === 'search' && (
        <Icon
          className="rl-field__icon rl-field__icon_type_search"
          name="search"
          title="Поиск"
          isCircular
        />
      )}
    </div>
  );
}

export const FieldInfo = memo(FieldInfoComponent);
