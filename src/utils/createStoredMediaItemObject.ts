import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

/**
 * storedMediaストアのstateのアイテムのオブジェクトを作成する
 * @param resultSingleMediaObject
 */
export default function createStoredMediaItemObject(
  resultSingleMediaObject: any
) {
  const {
    resultDataURLObject,
    resultDataURLSizeObject,
    resultImageInfoObject,
  } = resultSingleMediaObject;
  const resultObject = {
    id: uuidv4(),
    mediaType: 'image',
    dataType: 'dataURL',
    aspectRatio: resultImageInfoObject.imageRatio,
    createdAt: moment().toString(),
    mime: 'image/jpeg',
    fileSize: resultDataURLSizeObject,
    resource: resultDataURLObject,
    rawWidth: resultImageInfoObject.imageWidth,
    rawHeight: resultImageInfoObject.imageHeight,
    isSelected: false,
    itemOrder: 0,
  };
  return resultObject;
}
