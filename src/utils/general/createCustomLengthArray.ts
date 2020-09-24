/* eslint prefer-spread: 0 */
const createCustomLengthArray = (lengthOfArray: number) => {
  // @ts-ignore
  return Array.apply(null, { length: lengthOfArray });
};

export default createCustomLengthArray;
