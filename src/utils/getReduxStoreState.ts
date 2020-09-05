import moment from 'moment';
import { appSaveDataInfo } from '../constants/appConstantSettings';
import store, { AppState } from '../stores/index';

type AppStateKeyType = keyof AppState;

const getReduxStoreState = (
  storeKeyName?: AppStateKeyType | AppStateKeyType[] | null,
  isTransJson?: boolean,
  isDownload?: boolean
) => {
  const allState = store.getState();
  let resultState = {};
  if (!storeKeyName) {
    resultState = allState;
  } else if (typeof storeKeyName === 'string') {
    // @todo 後で必ず直す
    // @ts-ignore
    resultState = allState[storeKeyName];
  } else if (Array.isArray(storeKeyName)) {
    resultState = {
      ...storeKeyName,
    };
  }

  const result = isTransJson ? JSON.stringify(resultState) : resultState;

  if (isDownload) {
    const jsonBlob = new Blob([JSON.stringify(resultState, null, '  ')], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(jsonBlob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.download = `blendMonitoring${moment().format('YYYYMMDDHHMMSS')}.${
      appSaveDataInfo.extension
    }`;
    a.href = url;
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  return result;
};

export default getReduxStoreState;
