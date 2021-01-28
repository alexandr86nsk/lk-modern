import React from 'react';

import { defaultValues } from '@src/constants';
import { isArray } from '@src/utils';

import { ColorType } from '@components/Storybook/Colors/types';

import './styles.scss';

const SECOND_ELEMENT = 1;
const THIRD_ELEMENT = 2;

/*
 Check if the stylesheet is internal or hosted on the current domain.
 If it isn't, attempting to access sheet.cssRules will throw a cross origin error.
 See https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet#Notes
 
 NOTE: One problem this could raise is hosting stylesheets on a CDN with a
 different domain. Those would be cross origin, so you can't access them.
*/
const isSameDomain = (styleSheet: CSSStyleSheet) => {
  // Internal style blocks won't have an href value
  if (!styleSheet.href) {
    return true;
  }

  return styleSheet.href.indexOf(window.location.origin) === defaultValues.ZERO;
};

/*
 Determine if the given rule is a CSSStyleRule
 See: https://developer.mozilla.org/en-US/docs/Web/API/CSSRule#Type_constants
*/
const isStyleRule = (rule: CSSStyleRule) => rule.type === SECOND_ELEMENT;

/**
 * Get all custom properties on a page
 * @return array<array[string, string]>
 * ex; [["--color-accent", "#b9f500"], ["--color-text", "#252525"], ...]
 */
const getCSSCustomPropIndex = () =>
  // styleSheets is array-like, so we convert it to an array.
  // Filter out any stylesheets not on this domain
  Array.from(document.styleSheets)
    .filter(isSameDomain)
    .reduce(
      (finalArr, sheet: CSSStyleSheet) =>
        finalArr.concat(
          // cssRules is array-like, so we convert it to an array
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [...sheet.cssRules].filter(isStyleRule).reduce((propValArr, rule) => {
            const props = [...rule.style]
              .map((propName) => [propName.trim(), rule.style.getPropertyValue(propName).trim()])
              // Discard any props that don't start with "--". Custom props are required to.
              .filter(
                ([propName, val]) =>
                  propName.indexOf('--') === defaultValues.ZERO &&
                  val.indexOf('hsl') === defaultValues.ZERO
              );
            return [...propValArr, ...props];
          }, [])
        ),
      []
    );

const getColors = () => {
  const colorsObj: Record<string, ColorType[]> = {};
  getCSSCustomPropIndex().forEach(([name, value]: [string, string]) => {
    const section = name.replace('--', '').split('-')[SECOND_ELEMENT];
    if (isArray(colorsObj[section])) {
      colorsObj[section].push({
        name,
        value,
      });
    } else {
      colorsObj[section] = [];
      colorsObj[section].push({
        name,
        value,
      });
    }
  });
  return colorsObj;
};

const computedColors = getColors();

export const Colors = () => {
  return (
    <div className="rl-colors">
      <h1>Colors</h1>
      <ul className="rl-colors__list">
        {Object.keys(computedColors).map((key) => {
          return (
            <li key={key}>
              <h5
                style={{
                  borderColor: computedColors[key][THIRD_ELEMENT]?.value,
                  color: computedColors[key][THIRD_ELEMENT]?.value,
                }}
              >
                {key}
              </h5>
              <ul className="rl-colors__section">
                {computedColors[key].map((color: ColorType) => {
                  const { name, value } = color || {};
                  return (
                    <li key={name} className="rl-colors__color">
                      <div className="rl-colors__swatch" style={{ background: value }} />
                      <div className="rl-colors__details">
                        <div className="rl-colors__name" title={name}>
                          {name}
                        </div>
                        <div className="rl-colors__value" title={value}>
                          {value}
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
