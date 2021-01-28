import React, { useState, useMemo, useCallback } from 'react';

import { isArray } from '@src/utils';

import { icons, Icon, IconNames } from '@components/Icon';

import './styles.scss';
import { Field } from '@components/Form/components/Field';

const getIcons = (icons: string[]) => {
  const colorsObj: Record<string, string[]> = {};
  icons.forEach((iconName: string) => {
    const section = iconName.replace('Rounded', '').replace('Outline', '');
    if (isArray(colorsObj[section])) {
      colorsObj[section].push(iconName);
    } else {
      colorsObj[section] = [];
      colorsObj[section].push(iconName);
    }
  });
  return colorsObj;
};

export const Icons = () => {
  const [search, setSearch] = useState('');

  const sortedIcons = useMemo(() => {
    if (search) {
      return getIcons(Object.keys(icons).filter((v) => v.toLowerCase().includes(search)));
    }
    return getIcons(Object.keys(icons));
  }, [search]);

  const onChangeSearchValue = useCallback(({ value }) => {
    setSearch(value);
  }, []);

  return (
    <div className="rl-icons">
      <h1>Icons</h1>
      <div className="rl-icons__search">
        <Field value={search} onChange={onChangeSearchValue} type="text" theme="filled" />
      </div>
      <ul className="rl-icons__list">
        {Object.keys(sortedIcons).map((key) => {
          return (
            <li key={key}>
              <h5 className="rl-icons__subtitle">
                <span>{key}</span>
              </h5>
              <ul className="rl-icons__section">
                {sortedIcons[key].map((iconName) => {
                  return (
                    <li key={iconName} className="rl-icons__icon">
                      <div className="rl-icons__swatch">
                        <Icon name={iconName as IconNames} />
                      </div>
                      <div className="rl-icons__details">
                        <div className="rl-icons__name" title={iconName}>
                          {iconName}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
