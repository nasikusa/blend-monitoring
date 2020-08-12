import { v4 as uuidv4 } from 'uuid';

import {
  getSampleImageURLObject,
  getSampleImageAspect,
  unsplashRawWidth,
} from '../getSampleImages';

import {
  StoredMediaStateItemType,
  StoredMediaStateType,
} from '../../stores/storedMedia';

/**
 *
 * @param inputItemOrder
 * @param isUseSampleXXXId idにsample(数字)という文字列を使うかどうか
 */
export const createStoredMediaSingleItemState = (
  inputItemOrder: number,
  isUseSampleXXXId: boolean
): [string, StoredMediaStateItemType] => {
  /**
   * id
   */
  const resultID: string = isUseSampleXXXId
    ? `sample${inputItemOrder}`
    : uuidv4();

  /**
   * 結果となるオブジェクト
   */
  const resultObject: StoredMediaStateItemType = {
    id: resultID,
    mediaType: 'image',
    dataType: 'url',
    aspectRatio: getSampleImageAspect(inputItemOrder),
    resource: getSampleImageURLObject(inputItemOrder),
    rawWidth: unsplashRawWidth,
    rawHeight: unsplashRawWidth * getSampleImageAspect(inputItemOrder),
    mime: `image/jpeg`,
    isSelected: false,
    itemOrder: inputItemOrder,
  };
  return [resultID, resultObject];
};

export const createStoredMediaInitialState = (
  count: number,
  isUseSampleXXXId: boolean = true
): StoredMediaStateType => {
  const resultStateObject: { [key: string]: StoredMediaStateItemType } = {};
  for (let i = 0; i < count; i += 1) {
    const [insertID, insertResultObject] = createStoredMediaSingleItemState(
      i,
      isUseSampleXXXId
    );
    resultStateObject[insertID] = insertResultObject;
  }

  return resultStateObject;
};

export default createStoredMediaInitialState;
