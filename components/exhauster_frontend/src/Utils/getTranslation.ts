const translateDictionary = new Map([
  ['home', 'Главная'],
  ['Default', 'Все подшипники'],
  ['Problem', 'Предупреждение'],
  ['scheme', 'Схема'],
  ['chart', 'График'],
  ['sensorName', 'Агрегат'],
  ['sensorValue', 'Значение'],
  ['day', 'Сутки'],
  ['week', 'Неделя'],
  ['month', 'Месяц'],
  ['manual', 'Период'],
]);

function getTranslation(key: string): string {
  return translateDictionary.get(key) || key;
}

export default getTranslation;
