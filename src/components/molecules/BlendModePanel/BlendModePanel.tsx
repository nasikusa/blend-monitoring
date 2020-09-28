import React, { useState, useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import { readyBlendModeData } from '../../../utils/blendMode/getBlendModeData';
import BlendModalContainer from '../../../container/BlendModalContainer';
import { collectionValueBlendModeType } from '../../../stores/collection/collectionValueBlendMode';
import { RawCollectionDataContext } from '../Collection/Collection';

type Props = {
  storeDeleteBlendModeValue: any;
  storedBlendModeValue:
    | collectionValueBlendModeType
    | collectionValueBlendModeType[];
};

export const CollectionBlendModeValueContext = React.createContext<
  Props['storedBlendModeValue']
>([]);

const BlendModePanel = (props: Props) => {
  const { storeDeleteBlendModeValue, storedBlendModeValue } = props;

  const [open, setOpen] = useState(false);
  const rawCollectionDataContextObject = useContext(RawCollectionDataContext);
  const joinedRawCollectionData = rawCollectionDataContextObject;

  /**
   * モーダルの開閉stateをtrueにする関数
   */
  const handleOpen = (): void => {
    setOpen(true);
  };

  /**
   * blendModeパネルのボタンの描画モード名
   */
  const getBlendModeNameMenuView = (() => {
    if (Array.isArray(storedBlendModeValue)) {
      if (
        storedBlendModeValue.length > 0 &&
        storedBlendModeValue.every(
          (singleStoredBlendModeValue) =>
            singleStoredBlendModeValue.value === storedBlendModeValue[0].value
        )
      ) {
        const singleBlendModeData =
          readyBlendModeData[storedBlendModeValue[0].value];
        if (singleBlendModeData != null) {
          return singleBlendModeData.name.ja;
        }
      }
      return `複数の描画モード`;
    }
    const singleBlendModeData = readyBlendModeData[storedBlendModeValue.value];
    if (singleBlendModeData != null) {
      return singleBlendModeData.name.ja;
    }
    return '';
  })();

  /**
   * 描画モードチップのバツアイコンを押したときの関数
   * @param blendModeName 描画モード名(英語)
   */
  const handleChipClickClose = (targetInnerItemIndex: number): void => {
    if (Array.isArray(joinedRawCollectionData.innerItemId)) {
      storeDeleteBlendModeValue({
        targetId: joinedRawCollectionData.id,
        targetInnerId:
          joinedRawCollectionData.innerItemId[targetInnerItemIndex],
      });
    }
  };

  return (
    <>
      <Box mb={1}>
        <Grid container spacing={4}>
          <Grid item>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              {getBlendModeNameMenuView}
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box>
        {Array.isArray(storedBlendModeValue) &&
        storedBlendModeValue.length > 0 &&
        !storedBlendModeValue.every(
          (singleStoredBlendModeValue) =>
            singleStoredBlendModeValue.value === storedBlendModeValue[0]?.value
        ) ? (
          <Grid container spacing={1}>
            {storedBlendModeValue.map((singleBlendModeData, currentIndex) => {
              const chipLabelName = (() => {
                const singleBlendData =
                  readyBlendModeData[singleBlendModeData.value];
                if (singleBlendData != null) {
                  return singleBlendData.name.ja;
                }
                return '';
              })();
              return (
                <Grid item key={singleBlendModeData.id}>
                  <Chip
                    size="small"
                    onDelete={() => {
                      handleChipClickClose(currentIndex);
                    }}
                    label={chipLabelName}
                  />
                </Grid>
              );
            })}
          </Grid>
        ) : (
          ''
        )}
      </Box>
      <BlendModalContainer modalOpen={open} setModalOpen={setOpen} />
    </>
  );
};

export default BlendModePanel;
