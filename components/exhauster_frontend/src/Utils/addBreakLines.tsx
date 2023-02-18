import React from 'react';

// Take string, search for markers (\n)
// break string to few lines for displaying in the react component
function addBreakLines(text: string) {
  const regex = /(\n)/g;
  return text.split(regex).map((line) => {
    return line.match(regex) ? <br key={`key_${line}`} /> : line;
  });
}

export default addBreakLines;
