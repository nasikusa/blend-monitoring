import defaultBlendModeOrder from '../constants/defaultBlendModeOrder';

/**
 * 入力された描画モードの順序の配列に応じて、順番を変えた描画モードの新しい配列を返す
 */
export default (
  checkedBlendModeArray: string[],
  blendModeOrderArray = defaultBlendModeOrder
) => {
  const resultBlendModeArray = blendModeOrderArray.filter(
    (singleBlendModeName) => {
      if (checkedBlendModeArray.includes(singleBlendModeName)) {
        return true;
      }
      return false;
    }
  );
  return resultBlendModeArray;
};
