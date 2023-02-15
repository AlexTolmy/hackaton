const translateDictionary = new Map([['home', 'Главная']]);

function getTranslation(key: string): string {
  return translateDictionary.get(key) || key;
}

export default getTranslation;
