import { SyntheticEvent } from 'react';

function stopPropagation(event: SyntheticEvent) {
  event?.stopPropagation();
  event?.nativeEvent?.stopImmediatePropagation();
}

export default stopPropagation;
