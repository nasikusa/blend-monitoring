import React, { useCallback } from 'react';
import { css } from '@emotion/core';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import { useDropzone } from 'react-dropzone';
import Icon, { IconTypeTypes } from '../../atoms/Icon';

import getReduxStoreState from '../../../utils/getReduxStoreState';
import { appSaveDataInfo } from '../../../constants/appConstantSettings';
import loadSaveData from '../../../utils/getLoadedSaveData';

type Props = {
  removeAllStoredMedia: any;
  removeAllCollectionData: any;
  replaceAllGlSettings: any;
  replaceAllStoredMedia: any;
  replaceAllCollectionData: any;
  replaceAllThemeSettings: any;
  replaceAllBlendModeOrder: any;
  replaceAllStockedColors: any;
};

type GeneralFunctionsDataType = {
  name: string;
  iconType: IconTypeTypes;
  buttonText: string;
  onClick?: any;
};

const GeneralFunctionsList = (props: Props) => {
  const {
    removeAllStoredMedia,
    removeAllCollectionData,
    replaceAllGlSettings,
    replaceAllStoredMedia,
    replaceAllCollectionData,
    replaceAllThemeSettings,
    replaceAllBlendModeOrder,
    replaceAllStockedColors,
  } = props;
  const theme = useTheme();
  const onLoadDataDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 1) {
        const targetFileObject = acceptedFiles[0];
        const result = await loadSaveData(targetFileObject);
        // collectionDataを先に削除しておかないと、依存関係でエラーが出ます
        removeAllCollectionData();
        removeAllStoredMedia();
        replaceAllStoredMedia({ newState: result.storedMedia });
        replaceAllBlendModeOrder({ newState: result.blendModeOrder });
        replaceAllStockedColors({ newState: result.stockedColors });
        replaceAllThemeSettings({ newState: result.themeSettings });
        replaceAllGlSettings({ newState: result.glSettings });
        replaceAllCollectionData({ newState: result.collectionData });
      }
    },
    [
      removeAllStoredMedia,
      removeAllCollectionData,
      replaceAllThemeSettings,
      replaceAllBlendModeOrder,
      replaceAllStockedColors,
      replaceAllGlSettings,
      replaceAllStoredMedia,
      replaceAllCollectionData,
    ]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onLoadDataDrop,
    accept: `.${appSaveDataInfo.extension}`,
  });
  const generalFunctionsData: GeneralFunctionsDataType[] = [
    {
      name: 'saveData',
      iconType: 'functionSaveData',
      buttonText: 'セーブ',
      onClick: () => {
        getReduxStoreState(null, true, true);
      },
    },
    {
      name: 'loadData',
      iconType: 'functionUpload',
      buttonText: 'ロード',
      onClick: onLoadDataDrop,
    },
  ];

  const styles = {
    buttonGroup: css`
      width: 100%;
      background-color: ${theme.palette.background.paper};
    `,
  };

  return (
    <ButtonGroup
      orientation="vertical"
      color="primary"
      aria-label="vertical contained primary button group"
      variant="text"
      css={styles.buttonGroup}
    >
      {generalFunctionsData.map((singleGeneralFunctionItem) => {
        const hasFileOpenDialog = (() => {
          return singleGeneralFunctionItem.name === 'loadData';
        })();

        const ButtonContent = () => (
          <>
            <Button
              color="secondary"
              fullWidth
              onClick={singleGeneralFunctionItem.onClick}
              key={singleGeneralFunctionItem.name}
              size="medium"
              startIcon={<Icon type={singleGeneralFunctionItem.iconType} />}
              variant="outlined"
            >
              {hasFileOpenDialog && <input {...getInputProps()} />}
              {singleGeneralFunctionItem.buttonText}
            </Button>
            <Divider />
          </>
        );

        return hasFileOpenDialog ? (
          <div {...getRootProps()}>
            <Button
              color="secondary"
              fullWidth
              onClick={singleGeneralFunctionItem.onClick}
              key={singleGeneralFunctionItem.name}
              size="medium"
              startIcon={<Icon type={singleGeneralFunctionItem.iconType} />}
              variant="outlined"
            >
              {hasFileOpenDialog && <input {...getInputProps()} />}
              {singleGeneralFunctionItem.buttonText}
            </Button>
            <Divider />
          </div>
        ) : (
          <ButtonContent />
        );
      })}
    </ButtonGroup>
  );
};

export default GeneralFunctionsList;
