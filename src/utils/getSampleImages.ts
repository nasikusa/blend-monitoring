import {
  unsplashSampleImagesData,
  baseUnsplashImageQuority,
  baseImageSizeObjectType,
} from '../constants/image/unsplashSampleImages';

import baseImageSizeObject from '../constants/image/baseImageSize';

export const unsplashRawWidth = 2000;

/**
 * sample画像のURLを取得する関数
 * @param itemOrder 順番
 * @param itemSize nullならrawと判定
 */
export default function getSampleImageURL(
  itemOrder: number,
  itemSize?: keyof baseImageSizeObjectType
): string {
  if (itemSize == null) {
    return `${unsplashSampleImagesData[itemOrder].sourceBase}&w=${unsplashRawWidth}&q=${baseUnsplashImageQuority}`;
  }
  return `${unsplashSampleImagesData[itemOrder].sourceBase}&w=${baseImageSizeObject[itemSize]}&q=${baseUnsplashImageQuority}`;
}

/**
 * sample画像のURLオブジェクトを取得する
 * @param itemOrder サンプル画像の順番
 */
export function getSampleImageURLObject(itemOrder: number) {
  return {
    thumb: getSampleImageURL(itemOrder, 'thumb'),
    small: getSampleImageURL(itemOrder, 'small'),
    medium: getSampleImageURL(itemOrder, 'medium'),
    large: getSampleImageURL(itemOrder, 'large'),
    raw: getSampleImageURL(itemOrder),
  };
}

/**
 * sample画像のアスペクトを取得する
 * @param itemOrder サンプル画像の順番
 */
export function getSampleImageAspect(itemOrder: number): number {
  const aspectData = unsplashSampleImagesData[itemOrder].aspect;
  if (aspectData != null) {
    return aspectData;
  }
  return 1.0;
}
