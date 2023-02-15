function replaceSpaceSymbols(displayName: string) {
  return displayName.replace(/\s/g, '-').toLocaleLowerCase();
}

export default replaceSpaceSymbols;
