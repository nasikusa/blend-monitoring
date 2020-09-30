// @see https://stackoverflow.com/questions/41253310/typescript-retrieve-element-type-information-from-array-type
export type ArrayElement<
  ArrayType extends readonly unknown[]
> = ArrayType[number];
