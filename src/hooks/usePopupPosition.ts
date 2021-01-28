import { RefObject, useState } from 'react';

import { defaultValues, screenSizes } from '@src/constants';
import {
  useBodySizeObserver,
  useIsomorphicLayoutEffect,
  useResizeObserver,
  useScrollPosition,
} from '@src/hooks';
import { isDefined } from '@src/utils';

const MARGIN_FROM_PARENT = 10;
const MARGIN_FROM_BODY = 25;
const LINE_HEIGHT = 1.15;
const MAX_LINES = 3;
const MAX_OVERFLOW_LINES = 7;
const WIDTH_STEP = 50;
const MAX_WIDTH = 450;
const DOUBLE = 2;
const TAIL_WIDTH = 20;
const SHIFT = 10;

export type UsePopupPosition = {
  left?: number | string;
  right?: number | string;
  transform?: string;
  width?: number | string;
  tailStyle?: {
    left?: number | string;
    right?: number | string;
    bottom?: number | string;
    top?: number | string;
    transform?: string;
  };
};

export function usePopupPosition(
  containerRef: RefObject<Element>,
  noticeRef: RefObject<Element>,
  textRef: RefObject<Element>,
  maxWidth: number = MAX_WIDTH
): UsePopupPosition {
  const [contentRect, setContentRect] = useState<UsePopupPosition | null>(null);
  const [scrollY, setScrollY] = useState<number>(defaultValues.ZERO);

  const { width: bodyWidth, height: bodyHeight } = useBodySizeObserver();

  const { top, bottom, right, left, height: containerHeight, width: containerWidth } =
    containerRef.current?.getBoundingClientRect() || {};

  const { innerHeight: textHeight } = useResizeObserver(textRef);

  const { height: noticeHeight, width: noticeWidth } = useResizeObserver(noticeRef);

  useScrollPosition(({ currPos }) => {
    const { y } = currPos || {};
    setScrollY(y);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (
      isDefined(bodyWidth) &&
      isDefined(bodyHeight) &&
      isDefined(noticeHeight) &&
      isDefined(noticeWidth) &&
      isDefined(textHeight) &&
      isDefined(containerHeight) &&
      isDefined(containerWidth) &&
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
        const maxOverflowWidth = bodyWidth - MARGIN_FROM_BODY * DOUBLE;
        const freeTopSpace = top - MARGIN_FROM_PARENT;
        const freeRightSpace = bodyWidth - right - MARGIN_FROM_BODY;
        const freeBottomSpace = bodyHeight - bottom - MARGIN_FROM_PARENT;
        const freeLeftSpace = left - MARGIN_FROM_BODY;
        const noticeOut = noticeWidth - containerWidth;
        const halfNoticeOut = noticeOut / DOUBLE;

        // top or bottom
        if (noticeHeight <= freeTopSpace) {
          elBottom = -(noticeHeight + MARGIN_FROM_PARENT);
        } else if (noticeHeight <= freeBottomSpace) {
          elTop = containerHeight + MARGIN_FROM_PARENT;
        } else if (noticeHeight > freeBottomSpace && noticeHeight <= freeBottomSpace + scrollY) {
          elBottom = -(noticeHeight + MARGIN_FROM_PARENT);
        } else {
          elTop = containerHeight + MARGIN_FROM_PARENT;
        }

        // width
        if (textRef.current) {
          const { fontSize: styleFontSize } = getComputedStyle(textRef.current, null);
          const fontSize = parseFloat(styleFontSize.replace('px', ''));
          const lines = Math.ceil(textHeight / (fontSize * LINE_HEIGHT));
          if (elWidth < maxOverflowWidth) {
            if (elWidth <= maxWidth && lines >= MAX_LINES) {
              elWidth = elWidth + WIDTH_STEP;
            } else if (elWidth > maxWidth && lines >= MAX_OVERFLOW_LINES) {
              elWidth = elWidth + WIDTH_STEP;
            }
          } else {
            elWidth = maxOverflowWidth;
          }
        }

        // left or right
        if (noticeOut <= defaultValues.ZERO) {
          elLeft = -halfNoticeOut;
        } else {
          if (freeLeftSpace >= halfNoticeOut && freeRightSpace >= halfNoticeOut) {
            elLeft = -halfNoticeOut;
          } else if (freeLeftSpace < halfNoticeOut && freeRightSpace >= halfNoticeOut) {
            elLeft = freeLeftSpace < SHIFT ? -SHIFT : -freeLeftSpace;
          } else if (freeLeftSpace >= halfNoticeOut && freeRightSpace < halfNoticeOut) {
            elRight = freeRightSpace < SHIFT ? -SHIFT : -freeRightSpace;
          } else {
            elLeft = -freeRightSpace;
          }
        }

        const tailIndent = Math.floor(containerWidth / DOUBLE - TAIL_WIDTH / DOUBLE);

        setContentRect({
          left: elLeft,
          right: elRight,
          transform: `translateY(${isDefined(elTop) ? `${elTop}px` : `${elBottom}px`})`,
          width: elWidth,
          tailStyle: {
            left: isDefined(elLeft) ? -elLeft + tailIndent : undefined,
            right: isDefined(elRight) ? -elRight + tailIndent : undefined,
            bottom: isDefined(elBottom) ? undefined : 'unset',
            top: isDefined(elTop) ? undefined : 'unset',
            transform: isDefined(elTop) ? 'rotate(180deg)' : undefined,
          },
        });
      } else {
        setContentRect(null);
      }
    }
  }, [
    top,
    right,
    bottom,
    left,
    noticeHeight,
    noticeWidth,
    bodyWidth,
    bodyHeight,
    textHeight,
    textRef,
    maxWidth,
    scrollY,
    containerHeight,
    containerWidth,
  ]);

  return contentRect || {};
}
