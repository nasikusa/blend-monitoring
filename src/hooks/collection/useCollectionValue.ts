import { useSelector, shallowEqual } from 'react-redux';
/* eslint-disable import/no-unresolved */
import { AppState } from 'stores/index';
import { IdType } from 'types/collection/collectionData';
import { collectionValueImageType } from 'stores/collection/collectionValueImage';
import { collectionValueOpacityType } from 'stores/collection/collectionValueOpacity';
import { collectionValueColorType } from 'stores/collection/collectionValueColor';
import { collectionValueVisibilityType } from 'stores/collection/collectionValueVisibility';
import { collectionValueBlendModeType } from 'stores/collection/collectionValueBlendMode';
/* eslint-enable import/no-unresolved */

type targetValueTypes =
  | 'image'
  | 'opacity'
  | 'visibility'
  | 'color'
  | 'blendMode';

const useCollectionValue = (
  collectionId: IdType,
  targetValueType: targetValueTypes
) => {
  const targetValueStoreName = (() => {
    switch (targetValueType) {
      case 'image':
        return 'collectionValueImage';
      case 'color':
        return 'collectionValueColor';
      case 'opacity':
        return 'collectionValueOpacity';
      case 'visibility':
        return 'collectionValueVisibility';
      case 'blendMode':
        return 'collectionValueBlendMode';
      default:
        throw new Error();
    }
  })();

  const innerItemIdData = useSelector(
    (state: AppState) => state.collection[collectionId].innerItemId,
    shallowEqual
  );

  /**
   * 対象となる描画モードパラメータのID
   */
  const targetValueId: IdType | IdType[] = useSelector((state: AppState) => {
    if (Array.isArray(innerItemIdData)) {
      return innerItemIdData.map((singleInnerItemIdData) => {
        return state.collectionItem[singleInnerItemIdData][
          targetValueType
        ] as IdType;
      });
    }
    return state.collectionItem[innerItemIdData][targetValueType] as IdType;
  }, shallowEqual);

  /**
   * 対象となる描画モードvalueオブジェクト
   */
  const storedValue = useSelector((state: AppState) => {
    if (Array.isArray(targetValueId)) {
      return targetValueId.map((singleTargetValueId) => {
        return state[targetValueStoreName][singleTargetValueId];
      });
    }
    return state[targetValueStoreName][targetValueId];
  }, shallowEqual);

  return storedValue;
};

function validateTargetValueType(
  values: ReturnType<typeof useCollectionValue>,
  targetValueType: targetValueTypes
) {
  if (Array.isArray(values)) {
    if (
      !values.every((singleValues) => singleValues.type === targetValueType)
    ) {
      throw new Error(`value type is not ${targetValueType}`);
    }
  }
  if (!Array.isArray(values) && values.type !== targetValueType) {
    throw new Error(`value type is not ${targetValueType}`);
  }
  return true;
}

const useCollectionValueImage = (collectionId: string) => {
  const targetTypeName: targetValueTypes = 'image';
  const resultValue = useCollectionValue(collectionId, targetTypeName);
  validateTargetValueType(resultValue, targetTypeName);
  return resultValue as collectionValueImageType | collectionValueImageType[];
};

const useCollectionValueColor = (collectionId: string) => {
  const targetTypeName: targetValueTypes = 'color';
  const resultValue = useCollectionValue(collectionId, targetTypeName);
  validateTargetValueType(resultValue, targetTypeName);
  return resultValue as collectionValueColorType | collectionValueColorType[];
};

const useCollectionValueBlendMode = (collectionId: string) => {
  const targetTypeName: targetValueTypes = 'blendMode';
  const resultValue = useCollectionValue(collectionId, targetTypeName);
  validateTargetValueType(resultValue, targetTypeName);
  return resultValue as
    | collectionValueBlendModeType
    | collectionValueBlendModeType[];
};

const useCollectionValueVisibility = (collectionId: string) => {
  const targetTypeName: targetValueTypes = 'visibility';
  const resultValue = useCollectionValue(collectionId, targetTypeName);
  validateTargetValueType(resultValue, targetTypeName);
  return resultValue as
    | collectionValueVisibilityType
    | collectionValueVisibilityType[];
};

const useCollectionValueOpacity = (collectionId: string) => {
  const targetTypeName: targetValueTypes = 'opacity';
  const resultValue = useCollectionValue(collectionId, targetTypeName);
  validateTargetValueType(resultValue, targetTypeName);
  return resultValue as
    | collectionValueOpacityType
    | collectionValueOpacityType[];
};

export default useCollectionValue;

export {
  useCollectionValueImage,
  useCollectionValueColor,
  useCollectionValueOpacity,
  useCollectionValueVisibility,
  useCollectionValueBlendMode,
};
