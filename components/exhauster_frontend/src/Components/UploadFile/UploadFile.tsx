import React from 'react';

import Text from '../TextTitle/TextTitle';

import UploadFileProps from './types/UploadFile.interface';

import styles from './UploadFile.module.css';

function UploadFile({ title, onFilesChange, className }: UploadFileProps) {
  const readFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFilesChange(event.target.files);
  };

  return (
    <div className={className}>
      <div>
        <Text className={styles.text} textContent={title} />
      </div>
      <div className={styles.upload_block}>
        <label htmlFor={title}>
          <input type="file" id={title} onChange={readFile} />
        </label>
      </div>
    </div>
  );
}

export default React.memo(UploadFile);
