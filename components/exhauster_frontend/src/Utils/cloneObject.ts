// Deep clone of some object
function deepClone<T>(object: T): T {
  return object ? JSON.parse(JSON.stringify(object)) : null;
}

export default deepClone;
