import React from 'react';

function renderDefaultText(text: string) {
  return function TextRender() {
    return <p>{text}</p>;
  };
}

export default renderDefaultText;
