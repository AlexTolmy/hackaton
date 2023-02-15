import React, { useEffect, useRef } from 'react';

import { OutsideClickHandlerProps } from './OutsideClickHandler.interface';

function OutsideClickHandler(props: OutsideClickHandlerProps) {
  const { onOutsideClick, children, className } = props;
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleEvent = (event: Event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        onOutsideClick();
      }
    };

    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        handleEvent(event);
      }
    };

    document.addEventListener('mousedown', handleEvent);
    document.addEventListener('keyup', handleKeydown);

    return () => {
      document.removeEventListener('mousedown', handleEvent);
      document.removeEventListener('keyup', handleKeydown);
    };
  }, [onOutsideClick]);

  return (
    <div className={className} ref={wrapperRef}>
      {children}
    </div>
  );
}

export default React.memo(OutsideClickHandler);
