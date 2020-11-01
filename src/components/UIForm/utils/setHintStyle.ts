type IStyle = {
  left?: string;
  right?: string;
  bottom?: string;
  top?: string;
  width?: string;
  visibility?: 'visible',
};

interface IRef<T> {
  readonly current: T | null | undefined;
}

const generateHintStyle = (iconRef: IRef<HTMLDivElement>, messageRef: IRef<HTMLDivElement>): IStyle => {
  if (iconRef && messageRef) {
    const { current: iconEl } = iconRef || {};
    const { current: messageEl } = messageRef || {};
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

    if (document.body.offsetWidth - right > 250) {
      elLeft = '0px';
    }
    if (document.body.offsetWidth - right <= 250 && left > 250) {
      elRight = '0px';
    }
    if (document.body.offsetWidth - right <= 250 && left <= 250) {
      elLeft = `${left}px`;
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
  return {};
};

export default generateHintStyle;
