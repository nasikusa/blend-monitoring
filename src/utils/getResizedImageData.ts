import pica from 'pica';
import baseImageSizeObject, {
  baseImageSizeNames,
} from '../constants/baseImageSize';

/**
 * blobデータをdataURLに変換する
 * @param blob 画像のblobデータ(fileでも可能)
 */
export function readAsDataURL(blob: any) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(blob);
  });
}

export function getPicaResizedData(
  rawSizeDataURL: any,
  size: baseImageSizeNames
) {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();
    const targetResizedWidth = baseImageSizeObject[size];
    const offScreenCanvas = document.createElement('canvas');
    imgElement.onload = () => {
      const loadedImageRatio = imgElement.height / imgElement.width;
      offScreenCanvas.width =
        targetResizedWidth != null ? targetResizedWidth : 100;
      offScreenCanvas.height =
        targetResizedWidth != null
          ? targetResizedWidth * loadedImageRatio
          : 100;
      pica({ features: ['js', 'wasm', 'ww'] })
        .resize(imgElement, offScreenCanvas, {
          unsharpAmount: 80,
          unsharpRadius: 0.6,
          unsharpThreshold: 2,
        })
        .then((result: any) => {
          const resultDataURL = result.toDataURL('image/jpeg', 0.8);
          if (resultDataURL) {
            resolve(resultDataURL);
          }
          reject(resultDataURL);
        });
    };
    imgElement.src = rawSizeDataURL;
  });
}

export async function getSingleResizedImageData(singleFile: any) {
  const file = singleFile;
  const rawSizeDataURL = await readAsDataURL(file);

  const resizePromiseArray = [];
  const resizedSizeNames: baseImageSizeNames[] = [
    'thumb',
    'small',
    'medium',
    'large',
  ];
  for (let i = 0; i < resizedSizeNames.length; i += 1) {
    resizePromiseArray.push(
      getPicaResizedData(rawSizeDataURL, resizedSizeNames[i])
    );
  }
  const resultURLs = await Promise.all(resizePromiseArray);
  const [thumbResult, smallResult, mediumResult, largeResult] = resultURLs;

  const resultDataURLObject = {
    thumb: thumbResult,
    small: smallResult,
    medium: mediumResult,
    large: largeResult,
    raw: rawSizeDataURL,
  };

  return new Promise((resolve, reject) => {
    if (rawSizeDataURL) {
      resolve(resultDataURLObject);
    }
    reject(resultDataURLObject);
  });
}

export default async function getResizedImageData(files: any) {
  const resultDataURLObjectArray = await Promise.all(
    files.map(async (singleFile: any) => getSingleResizedImageData(singleFile))
  );
  return resultDataURLObjectArray;
}
