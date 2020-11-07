import { PopupStyle } from '../@types';
import { UseRef } from '../../../../@types/costomTypes';

export default function generatePopupStyle(
  parentRef: UseRef<HTMLDivElement>, popupRef: UseRef<HTMLDivElement>,
): PopupStyle | null {
  if (parentRef && popupRef) {
    const { current: iconCurrent } = parentRef || {};
    const { current: messageCurrent } = popupRef || {};
    let iconEl;
    let messageEl;
    try {
      iconEl = iconCurrent.getBoundingClientRect();
      messageEl = messageCurrent.getBoundingClientRect();
    } catch (e) {
      console.log('[Fn: generatePopupStyle] Error: ', e);
    }
    const {
      top = 0,
      right = 0,
      left = 0,
    } = iconEl || {};

    const {
      height = 0,
    } = messageEl || {};

    let elLeft;
    let elRight;
    let elBottom;
    let elTop;
    let elWidth;

    if (document.body.offsetWidth - left > 250) {
      elLeft = '0px';
    }
    if (document.body.offsetWidth - right <= 250 && right > 250) {
      elRight = '0px';
    }
    if (document.body.offsetWidth - right <= 250 && right <= 250) {
      elLeft = `-${left}px`;
      elWidth = `${document.body.offsetWidth}px`;
    }
    if (top >= height) {
      elBottom = 'calc(100% + 0.3em)';
    } else {
      elTop = 'calc(100% + 0.3em)';
    }

    return {
      left: elLeft,
      right: elRight,
      bottom: elBottom,
      top: elTop,
      width: elWidth,
      visibility: 'visible',
      opacity: '1',
    };
  }
  return null;
}
