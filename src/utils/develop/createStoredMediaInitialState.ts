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

export const createStoredMediaSingleItemState = (
  inputItemOrder: number,
  isUseSampleXXXId: boolean
): [string, StoredMediaStateItemType] => {
  const resultID: string = isUseSampleXXXId
    ? `sample${inputItemOrder}`
    : uuidv4();
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
  const resultStateObject: any = {};
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
