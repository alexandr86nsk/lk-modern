import { useBodySizeObserver } from '@hooks/useBodySizeObserver';
import { useResizeObserver } from '@hooks/useResizeObserver';
import { RefObject, useEffect, useState } from 'react';

import { defaultValues, screenSizes } from '@src/constants';
import { isDefined } from '@src/utils';

const SCALE = 1.5;
const MARGIN_FROM_PARENT = 5;
const MARGIN_FROM_BODY = 15;

export type UsePopupPosition = {
  left?: number | string;
  right?: number | string;
  bottom?: number | string;
  top?: number | string;
  width?: number | string;
};

export function usePopupPosition(
  containerRef: RefObject<Element>,
  noticeRef: RefObject<Element>
): UsePopupPosition {
  const [contentRect, setContentRect] = useState<UsePopupPosition | null>(null);

  const { width: bodyWidth, height: bodyHeight } = useBodySizeObserver();

  const { top, bottom, right, left } = containerRef.current?.getBoundingClientRect() || {};

  const { height: noticeHeight, width: noticeWidth } = useResizeObserver(noticeRef);

  useEffect(() => {
    if (
      isDefined(bodyWidth) &&
      isDefined(bodyHeight) &&
      isDefined(noticeHeight) &&
      isDefined(noticeWidth) &&
      isDefined(top) &&
      isDefined(right) &&
      isDefined(bottom) &&
      isDefined(left)
    ) {
      if (bodyWidth >= screenSizes.NOTEBOOK) {
        let elLeft;
        let elRight;
        let elBottom;
        let elTop;
        let elWidth = noticeWidth;
        const maxWidth = bodyWidth - MARGIN_FROM_BODY - MARGIN_FROM_BODY;

        if (noticeHeight <= top) {
          elBottom = `calc(100% + ${MARGIN_FROM_PARENT}px)`;
        } else {
          elTop = `calc(100% + ${MARGIN_FROM_PARENT}px)`;
        }

        if (bodyWidth - left > elWidth) {
          elLeft = defaultValues.ZERO;
        } else if (right > elWidth) {
          elRight = defaultValues.ZERO;
        } else {
          elLeft = -left + MARGIN_FROM_BODY;
        }

        if (noticeHeight > elWidth) {
          if (noticeHeight * SCALE <= maxWidth) {
            elWidth = noticeHeight * SCALE;
          } else {
            elWidth = maxWidth;
          }
        }

        /*if (elWidth > maxWidth || (noticeHeight > top && noticeHeight > bodyHeight - bottom)) {
          elWidth = maxWidth;
        }*/

        setContentRect({
          left: elLeft,
          right: elRight,
          bottom: elBottom,
          top: elTop,
          width: elWidth,
        });
      } else {
        setContentRect(null);
      }
    }
  }, [top, right, bottom, left, noticeHeight, noticeWidth, bodyWidth, bodyHeight]);

  return contentRect || {};
}
