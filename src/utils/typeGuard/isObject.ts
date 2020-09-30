const isObject = (x: unknown): x is object =>
  x !== null && (typeof x === 'object' || typeof x === 'function');

export default isObject;
