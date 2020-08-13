import {
  GlCollectionInterfaceArray,
  GlCollectionInterface,
  canCollectionMultiItemProps,
} from '../stores/collectionData';

const aryMaxFunctionForReduce = (a: number, b: number): number => {
  return Math.max(a, b);
};

const aryMinFunctionForReduce = (a: number, b: number): number => {
  return Math.min(a, b);
};

/**
 * storeに保存されている GlCollectionInterfaceArray
 *  型のアイテムの中から最大/最小の配列の数を取得する関数
 * @param getType 取得するタイプ
 * @param isCountArrayOnly 配列データのみ計測する
 */
export default (
  collectionData: GlCollectionInterfaceArray = [],
  getType: 'min' | 'max' = 'max',
  isCountArrayOnly: boolean = false
) => {
  const targetProps: (keyof GlCollectionInterface &
    canCollectionMultiItemProps)[] = ['blendMode', 'color', 'image'];
  const allCollectionLength = collectionData.length;
  /**
   * 最終的な最大のアイテム数
   */
  const resultLengthArray: number[] = targetProps.map(
    (singleTargetProp: keyof GlCollectionInterface) => {
      /**
       * 内部で使用されるlengthプロパティの値の配列
       */
      const internalLengthArray: number[] = [];
      for (let i = 0; i < allCollectionLength; i += 1) {
        /**
         * 単一コレクションの単一プロパティの値
         */
        const currentPropValue = collectionData[i][singleTargetProp];
        if (Array.isArray(currentPropValue)) {
          internalLengthArray.push(currentPropValue.length);
        }
        if (!isCountArrayOnly) {
          internalLengthArray.push(1);
        }
      }
      if (internalLengthArray.length === 0) {
        return 0;
      }
      if (getType === 'max') {
        /**
         * 単一のプロパティでの最大のlength
         */
        const maxLengthValue = internalLengthArray.reduce(
          aryMaxFunctionForReduce
        );
        return maxLengthValue;
      }
      /**
       * 単一のプロパティでの最小のlength
       */
      const minLengthValue = internalLengthArray.reduce(
        aryMinFunctionForReduce
      );
      return minLengthValue;
    }
  );
  if (collectionData.length === 0) {
    return 0;
  }
  if (getType === 'max') {
    /**
     * 対象となるすべてのプロパティでの最大のlength
     */
    const maxLengthValue = resultLengthArray.reduce(aryMaxFunctionForReduce);
    return maxLengthValue;
  }
  /**
   * 対象となるすべてのプロパティでの最小のlength
   */
  const minLengthValue = resultLengthArray.reduce(aryMaxFunctionForReduce);
  return minLengthValue;
};
