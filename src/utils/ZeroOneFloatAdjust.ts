export default (param: number): string => {
  if (param === 1) {
    return '1.0';
  }
  if (param === 0) {
    return '0.0';
  }
  return `${param}`;
};
