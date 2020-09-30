/**
 * glslではfloatの値しか許容されないため、1や0などの整数でも小数表示を強制するためのスクリプト
 */
export default (param: number): string => {
  if (param === 1) {
    return '1.0';
  }
  if (param === 0) {
    return '0.0';
  }
  return `${param}`;
};
