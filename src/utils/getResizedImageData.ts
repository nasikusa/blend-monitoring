import pica from 'pica';
import baseImageSizeObject, {
  baseImageSizeNames,
} from '../constants/baseImageSize';

// const ColorThief = require('colorthief');

/**
 * blobデータをdataURLに変換する
 * @param blob 画像のblobデータ(fileでも可能)
 */
export function readAsDataURL(blob: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const resultData = reader.result;
      if (typeof resultData === 'string') {
        resolve(resultData);
      }
    };
    reader.onerror = () => {
      reject(reader.error);
    };
    reader.readAsDataURL(blob);
  });
}

function getRawImageData(rawSizeDataURL: any): Promise<any[]> {
  return new Promise((resolve) => {
    const imgElement = new Image();
    // const colorThief = new ColorThief();
    // console.log(colorThief);
    imgElement.src = rawSizeDataURL;
    imgElement.onload = () => {
      // console.log(imgElement);
      const imageElement = imgElement;
      const imageWidth = imgElement.width;
      const imageHeight = imgElement.height;
      const imageRatio = imageHeight / imageWidth;
      // const imageColor = colorThief.getColor(imgElement);
      // const imagePalette = colorThief.getPalette(imgElement, 10);
      resolve([
        imageElement,
        imageWidth,
        imageHeight,
        imageRatio,
        // imageColor,
        // imagePalette,
      ]);
    };
  });
}

export function getPicaResizedData(
  rawSizeDataURL: any,
  size: baseImageSizeNames,
  imageElement: any,
  imageRatio: number
): Promise<string> {
  return new Promise((resolve, reject) => {
    const targetResizedWidth = baseImageSizeObject[size];
    const offScreenCanvas = document.createElement('canvas');
    offScreenCanvas.width =
      targetResizedWidth != null ? targetResizedWidth : 100;
    offScreenCanvas.height =
      targetResizedWidth != null ? targetResizedWidth * imageRatio : 100;
    pica({ features: ['js', 'wasm', 'ww'] })
      .resize(imageElement, offScreenCanvas, {
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
      })
      .catch(() => {
        reject(new Error('エラーが発生しました'));
      });
  });
}

export async function getSingleResizedImageData(singleFile: any) {
  const file = singleFile;
  const rawSizeDataURL = await readAsDataURL(file);
  const [
    imageElement,
    imageWidth,
    imageHeight,
    imageRatio,
    // imageColor,
    // imagePalette,
  ] = await getRawImageData(rawSizeDataURL);

  const resizePromiseArray = [];
  const resizedSizeNames: baseImageSizeNames[] = [
    'thumb',
    'small',
    'medium',
    'large',
  ];
  for (let i = 0; i < resizedSizeNames.length; i += 1) {
    resizePromiseArray.push(
      getPicaResizedData(
        rawSizeDataURL,
        resizedSizeNames[i],
        imageElement,
        imageRatio
      )
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

  const resultDataURLSizeObject = {
    thumb: thumbResult.length,
    small: smallResult.length,
    medium: mediumResult.length,
    large: largeResult.length,
    raw: rawSizeDataURL.length,
  };

  const resultImageInfoObject = {
    imageWidth,
    imageHeight,
    imageRatio,
    // imageColor,
    // imagePalette,
  };

  return {
    resultDataURLObject,
    resultDataURLSizeObject,
    resultImageInfoObject,
  };

  // return new Promise((resolve, reject) => {
  //   if (rawSizeDataURL) {
  //     resolve(resultDataURLObject);
  //   }
  //   reject(new Error('エラーが発生しました'));
  // });
}

export default async function getResizedImageData(files: any) {
  const resultDataURLObjectArray = await Promise.all(
    files.map(async (singleFile: any) => getSingleResizedImageData(singleFile))
  );
  return resultDataURLObjectArray;
}
