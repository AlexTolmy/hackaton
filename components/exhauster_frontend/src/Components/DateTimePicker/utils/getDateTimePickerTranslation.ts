const translateDictionary = new Map([
  ['time', 'Время'],
  ['select', 'Выбрать'],
]);

function getDateTimePickerTranslation(key: string) {
  return translateDictionary.get(key) || key;
}

export default getDateTimePickerTranslation;
