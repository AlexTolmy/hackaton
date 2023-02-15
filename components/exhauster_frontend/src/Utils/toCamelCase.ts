const toCamel = (s: string) => {
  return s.replace(/([-_][a-z])/gi, ($1) => {
    return $1.toUpperCase().replace('-', '').replace('_', '');
  });
};

const isArray = (data: unknown) => {
  return Array.isArray(data);
};

const isObject = (data: unknown) => {
  return data === Object(data) && !isArray(data) && typeof data !== 'function';
};

export default function toCamelCase(data: any) {
  if (isObject(data)) {
    const obj = {};

    Object.keys(data).forEach((item) => {
      obj[toCamel(item)] = toCamelCase(data[item]);
    });

    return obj;
  }
  if (isArray(data)) {
    return data.map((i: unknown) => {
      return toCamelCase(i);
    });
  }

  return data;
}
