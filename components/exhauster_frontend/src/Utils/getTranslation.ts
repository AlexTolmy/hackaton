const translateDictionary = new Map([
  ['home', 'Главная'],
  ['Default', 'Все подшипники'],
  ['Problem', 'Предупреждение'],
]);

function getTranslation(key: string): string {
  return translateDictionary.get(key) || key;
}

export default getTranslation;
