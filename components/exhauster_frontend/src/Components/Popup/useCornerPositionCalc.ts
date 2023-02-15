import { useEffect, useMemo, useRef, useState } from 'react';

function useCornerPositionCalc(cornerParentElement, yOffset) {
  const cornerRef = useRef(null);
  const [attachableElementRect, setAttachableElementRect] = useState(null);
  const [initialCornerRect, setInitialCornerRect] = useState(null);

  // Calculate corner position depends on parent element position
  const cornerPosition = useMemo(() => {
    if (!initialCornerRect || !attachableElementRect) {
      return { top: 0, left: 0 };
    }

    const offset = attachableElementRect.height / 2 + yOffset;
    const cornerY = attachableElementRect.top - initialCornerRect.top + offset;
    const cornerX =
      attachableElementRect.left -
      initialCornerRect.left +
      attachableElementRect.width / 2 -
      initialCornerRect.width / 2;

    return {
      top: cornerY,
      left: cornerX,
    };
  }, [initialCornerRect, attachableElementRect, yOffset]);

  // Call logic every render because
  // we need react on parent element position changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const cornerRect = cornerRef.current.getClientRects()[0];
    const attachableRect = cornerParentElement?.getClientRects()[0];

    if (attachableElementRect) {
      const isXPosChanged = attachableRect.x !== attachableElementRect.left;
      const isYPosChanged = attachableRect.y !== attachableElementRect.top;

      if (!isXPosChanged && !isYPosChanged) {
        return;
      }
    }

    if (!initialCornerRect) {
      setInitialCornerRect(cornerRect);
    }

    setAttachableElementRect(attachableRect);
  });

  return { cornerRef, cornerPosition };
}

export default useCornerPositionCalc;
