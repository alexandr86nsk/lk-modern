import { UseRef, PopupStyle } from '../@types/custom';

const generatePopupStyle = (
  parentRef: UseRef<HTMLDivElement>, popupRef: UseRef<HTMLDivElement>,
): PopupStyle | null => {
  if (parentRef && popupRef) {
    const { current: iconEl } = parentRef || {};
    const { current: messageEl } = popupRef || {};
    const {
      top, right, left,
    } = iconEl.getBoundingClientRect();

    const {
      height,
    } = messageEl.getBoundingClientRect();

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
    };
  }
  return null;
};

export default generatePopupStyle;
