import { v4 as uuidv4 } from 'uuid';
// import moment from 'moment';
import { StoredMediaStateItemType } from '../stores/storedMedia';
import { singleResizedImageDataType } from './getResizedImageData';

/**
 * storedMediaストアのstateのアイテムのオブジェクトを作成する
 * @param resultSingleMediaObject
 */
export default function createStoredMediaItemObject(
  resultSingleMediaObject: singleResizedImageDataType
): StoredMediaStateItemType {
  const {
    resultDataURLObject,
    resultDataURLSizeObject,
    resultImageInfoObject,
  } = resultSingleMediaObject;
  const resultObject: StoredMediaStateItemType = {
    id: uuidv4(),
    mediaType: 'image',
    dataType: 'dataURL',
    aspectRatio: resultImageInfoObject.imageRatio,
    // createdAt: moment().toString(),
    mime: 'image/jpeg',
    color: {
      dominant: resultImageInfoObject.imageColor,
      palette: resultImageInfoObject.imagePalette,
    },
    fileSize: resultDataURLSizeObject,
    resource: resultDataURLObject,
    rawWidth: resultImageInfoObject.imageWidth,
    rawHeight: resultImageInfoObject.imageHeight,
    isSelected: false,
    itemOrder: 0,
  };
  return resultObject;
}
