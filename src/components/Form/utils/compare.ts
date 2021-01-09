import { v4 } from "uuid";
import { isDefined } from "@src/utils";

export function compareLength(value: string | number, min?: number, max?: number) {
  const errors = [];
  let normalizeValue;
  if (typeof value === 'number') {
    normalizeValue = value.toString();
  } else {
    normalizeValue = value;
  }
  const valueLength = normalizeValue.length;
  if (isDefined(min) && valueLength < min) {
      errors.push({
        id: v4(),
        value: `Количество введенных символов, меньше минимально допустимого! Минимум: ${min}.`,
      });
  }
  if (isDefined(max) && valueLength > max) {
      errors.push({
        id: v4(),
        value: `Количество введенных символов, больше максимально допустимого! Максимум: ${max}.`,
      });
  }
  return errors;
}

export function compareInteger(value: number | string, min?: number, max?: number) {
    const errors = [];
    let normalizeValue;
    if (typeof value === 'string') {
      normalizeValue = parseInt(value, 10);
    } else {
      normalizeValue = value;
    }
    if (isDefined(min) && normalizeValue < min) {
      errors.push({ id: v4(), value: `Указанное значение, меньше минимально допустимого! Минимум: ${min}.` });
    }
    if (isDefined(max) && normalizeValue > max) {
      errors.push({ id: v4(), value: `Указанное значение, больше максимально допустимого! Максимум: ${max}.` });
    }
    return errors;
}