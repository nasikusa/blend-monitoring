import pica from 'pica';
import ColorThief from 'colorthief';
import chroma from 'chroma-js';
import { StoredMediaStateItemType } from '../../stores/storedMedia';
import baseImageSizeObject, {
  baseImageSizeNames,
} from '../../constants/image/baseImageSize';

export type resultImageInfoObjectType = {
  imageWidth: StoredMediaStateItemType['rawWidth'];
  imageHeight: StoredMediaStateItemType['rawHeight'];
  imageRatio: StoredMediaStateItemType['aspectRatio'];
  imageColor: string;
  imagePalette: string[];
};

export type singleResizedImageDataType = {
  resultDataURLObject: StoredMediaStateItemType['resource'];
  resultDataURLSizeObject: StoredMediaStateItemType['fileSize'];
  resultImageInfoObject: resultImageInfoObjectType;
};

/**
 * fileデータをdataURLに変換する
 * @param file 画像のfileデータ(fileでも可能)
 */
export function readAsDataURL(file: File): Promise<string> {
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
    reader.readAsDataURL(file);
  });
}

function getRawImageData(
  rawSizeDataURL: string
): Promise<[HTMLImageElement, number, number, number, string, string[]]> {
  return new Promise((resolve) => {
    const imgElement = new Image();
    const colorThief: ColorThief = new ColorThief();
    imgElement.src = rawSizeDataURL;
    imgElement.onload = () => {
      const imageElement = imgElement;
      const imageWidth = imgElement.width;
      const imageHeight = imgElement.height;
      const imageRatio = imageHeight / imageWidth;
      const imageColor = chroma(colorThief.getColor(imgElement)).hex();
      const imagePalette = colorThief
        .getPalette(imgElement, 10)
        .map((singlePaletteValue) => {
          return chroma(singlePaletteValue).hex();
        });
      resolve([
        imageElement,
        imageWidth,
        imageHeight,
        imageRatio,
        imageColor,
        imagePalette,
      ]);
    };
  });
}

/**
 * @todo picaのリサイズ時の設定をコントロールしたいです
 * @todo picaの処理を行わずにネイティブのcanvasのみでもリサイズできるようにしたいです。
 */
export function getPicaResizedData(
  rawSizeDataURL: string,
  size: baseImageSizeNames,
  imageElement: HTMLImageElement,
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
      .then((result: HTMLCanvasElement) => {
        const resultDataURL: string = result.toDataURL('image/jpeg', 0.8);
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

export async function getSingleResizedImageData(
  singleFile: File
): Promise<singleResizedImageDataType> {
  const file = singleFile;
  const rawSizeDataURL = await readAsDataURL(file);
  const [
    imageElement,
    imageWidth,
    imageHeight,
    imageRatio,
    imageColor,
    imagePalette,
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
  const resultURLs: string[] = await Promise.all(resizePromiseArray);
  const [thumbResult, smallResult, mediumResult, largeResult] = resultURLs;

  const resultDataURLObject: StoredMediaStateItemType['resource'] = {
    thumb: thumbResult,
    small: smallResult,
    medium: mediumResult,
    large: largeResult,
    raw: rawSizeDataURL,
  };

  const resultDataURLSizeObject: StoredMediaStateItemType['fileSize'] = {
    thumb: thumbResult.length,
    small: smallResult.length,
    medium: mediumResult.length,
    large: largeResult.length,
    raw: rawSizeDataURL.length,
  };

  const resultImageInfoObject: resultImageInfoObjectType = {
    imageWidth,
    imageHeight,
    imageRatio,
    imageColor,
    imagePalette,
  };

  return {
    resultDataURLObject,
    resultDataURLSizeObject,
    resultImageInfoObject,
  };
}

export default async function getResizedImageData(files: File[]) {
  const resultDataURLObjectArray = await Promise.all(
    files.map(async (singleFile: File) => getSingleResizedImageData(singleFile))
  );
  return resultDataURLObjectArray;
}
