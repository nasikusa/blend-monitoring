import pica from 'pica';
import baseImageSizeObject from '../constants/baseImageSize';

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

export function getPicaResizedData(rawSizeDataURL: string, size: string) {
  return new Promise((resolve, reject) => {
    const imgElement = new Image();
    imgElement.src = rawSizeDataURL;
  });
}

export default async function getResizedImageData(files: any) {}

export async function getSingleResizedImageData(singleFile: any) {
  const file = singleFile;
  const rawSizeDataURL = await readAsDataURL(file);

  return new Promise((resolve, reject) => {
    if (rawSizeDataURL) {
      resolve(rawSizeDataURL);
    }
    reject(rawSizeDataURL);
  });
}

function root() {
  const img = acceptedFiles[0];
  const reader = new FileReader();
  reader.readAsDataURL(img);
  reader.onload = () => {
    // console.log(reader.result);
    const imgElement = new Image();
    if (typeof reader.result === 'string') {
      imgElement.src = reader.result;
      if (imgElement != null) {
        // @ts-ignore
        imgElement.onload = () => {
          const offScreenCanvas = document.createElement('canvas');
          offScreenCanvas.width = 100;
          offScreenCanvas.height = 60;
          pica({ features: ['js', 'wasm', 'ww'] })
            .resize(imgElement, offScreenCanvas, {
              unsharpAmount: 80,
              unsharpRadius: 0.6,
              unsharpThreshold: 2,
            })
            .then((result: any) => {
              console.log('fire!');
              console.log(result.toDataURL());
            });
        };
      }
    }
  };
}
