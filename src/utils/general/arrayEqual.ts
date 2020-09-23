/**
 * ２つの配列がequalであるかどうかを
 * @param arr1
 * @param arr2
 * @see https://github.com/component/array-equal
 */
function arrayEqual(arr1: any[], arr2: any[]) {
  const { length } = arr1;
  if (arr1 === arr2) return true;
  if (length !== arr2.length) return false;
  for (let i = 0; i < length; i += 1) if (arr1[i] !== arr2[i]) return false;
  return true;
}

export default arrayEqual;
