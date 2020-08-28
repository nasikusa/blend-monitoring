import { AppState } from '../stores/index';

/**
 * fileデータをtextに変換する
 * @param file 画像のfileデータ(fileでも可能)
 */
export function readAsText(file: File): Promise<string> {
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
    reader.readAsText(file);
  });
}

const getLoadedSaveData = async (blmnFile: File): Promise<AppState> => {
  const uploadedBLMNFile = await readAsText(blmnFile);
  const blmnSaveDataObject = JSON.parse(uploadedBLMNFile);
  return blmnSaveDataObject;
};

export default getLoadedSaveData;
