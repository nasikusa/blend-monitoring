import defaultBlendModeOrder from '../constants/defaultBlendModeOrder';

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
