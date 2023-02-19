import { AxiosError } from 'axios';
import { Dispatch } from 'redux';

import addBreakLines from '../../Utils/addBreakLines';
import getTranslation from '../../Utils/getTranslation';
import { addNotification } from '../reducers/notificationReducer';
import { NotificationType } from '../types/NotificationReducerType';

function getErrorMessage(error: AxiosError, title: string) {
  const errorCode = error.response?.status || getTranslation('unknown');
  const requestUrl = error.response?.config.url || getTranslation('unknown');
  const description =
    JSON.stringify(error.response?.data) || getTranslation('unknown');

  const message = `${title}\n\n${getTranslation(
    'requestUrl',
  )}: ${requestUrl}\n${getTranslation(
    'errorCode',
  )}: ${errorCode}\n\n${getTranslation('errorDescription')}: ${description}`;

  return {
    message: addBreakLines(message),
    type: NotificationType.Error,
  };
}

export function createErrorNotification(
  dispatch: Dispatch<any>,
  error: AxiosError,
  title?: string,
) {
  const titleText = title || getTranslation('somethingWentWrong');
  dispatch(addNotification(getErrorMessage(error, titleText)));
}
