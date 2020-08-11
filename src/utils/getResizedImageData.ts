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
  const thumbSizeDataURL = await getPicaResizedData(rawSizeDataURL, 'thumb');
  const smallSizeDataURL = await getPicaResizedData(rawSizeDataURL, 'small');
  const mediumSizeDataURL = await getPicaResizedData(rawSizeDataURL, 'medium');
  const largeSizeDataURL = await getPicaResizedData(rawSizeDataURL, 'large');

  const resultDataURLObject = {
    thumb: thumbSizeDataURL,
    small: smallSizeDataURL,
    medium: mediumSizeDataURL,
    large: largeSizeDataURL,
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

// function root() {
//   const img = acceptedFiles[0];
//   const reader = new FileReader();
//   reader.readAsDataURL(img);
//   reader.onload = () => {
//     // console.log(reader.result);
//     const imgElement = new Image();
//     if (typeof reader.result === 'string') {
//       imgElement.src = reader.result;
//       if (imgElement != null) {
//         // @ts-ignore
//         imgElement.onload = () => {
//           const offScreenCanvas = document.createElement('canvas');
//           offScreenCanvas.width = 100;
//           offScreenCanvas.height = 60;
//           pica({ features: ['js', 'wasm', 'ww'] })
//             .resize(imgElement, offScreenCanvas, {
//               unsharpAmount: 80,
//               unsharpRadius: 0.6,
//               unsharpThreshold: 2,
//             })
//             .then((result: any) => {
//               console.log('fire!');
//               console.log(result.toDataURL());
//             });
//         };
//       }
//     }
//   };
// }
