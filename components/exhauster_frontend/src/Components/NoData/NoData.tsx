import React from 'react';

import getTranslation from '../../Utils/getTranslation';

function NoData() {
  return <div>{getTranslation('noData')}</div>;
}

export default NoData;
