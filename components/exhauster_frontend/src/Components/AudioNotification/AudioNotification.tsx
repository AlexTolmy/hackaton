import React, { useEffect } from 'react';

import { AudioNotificationProps } from './AudioNotification.interface';

const DEFAULT_REPEAT_TIME = 1000 * 60 * 5;

function AudioNotification(props: AudioNotificationProps) {
  const { isRepeat, repeatTime = DEFAULT_REPEAT_TIME } = props;

  useEffect(() => {
    const audio = new Audio('notify.wav');
    audio.load();

    let interval: NodeJS.Timer;

    if (isRepeat) {
      interval = setInterval(() => {
        audio.play();
      }, repeatTime);
    } else {
      audio.play();
    }

    return () => {
      clearInterval(interval);
    };
  }, [isRepeat, repeatTime]);

  return <div />;
}

export default AudioNotification;
