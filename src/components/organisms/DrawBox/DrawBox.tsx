import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

/* eslint-disable import/no-unresolved */
import DrawItemContainer from 'containers/DrawItemContainer';
import createCustomLengthArray from 'utils/general/createCustomLengthArray';
import { maxCountOfGlItem } from 'constants/general/appConstantSettings';
/* eslint-enable import/no-unresolved */
import DefaultWelcome from '../../molecules/DefaultWelcome';
import CustomAlert from '../../atoms/CustomAlert';
import NoticeSnackbar from '../../atoms/NoticeSnackbar';
import GlItemOrderContextElement from './GlItemOrderContextElement';

export type Props = {
  drawItemCount: number;
  drawItemKeys: string[];
  drawBoxRowCount: number;
  hasCanMultiCollectionType: boolean;
};

const DrawItemContext = React.createContext({
  drawItemOrder: -1,
  hasCanMultiCollectionType: false,
});

/**
 * glsl描画アイテムのラッパーコンポーネント
 * @todo 最大アイテム数以上のときに警告を表示する
 */
const DrawBox: React.FC<Props> = (props) => {
  const {
    drawItemCount,
    drawItemKeys,
    drawBoxRowCount,
    hasCanMultiCollectionType,
  } = props;

  const [overItemNumberFlag, setOverItemNumberFlag] = useState<boolean>(false);

  const handleSnackbarClose = (): void => {
    setOverItemNumberFlag(false);
  };

  /**
   * 最大のglItem数を考慮した表示されるアイテム数
   */
  let resultGlItemCountValue = drawItemCount;
  if (resultGlItemCountValue > maxCountOfGlItem) {
    resultGlItemCountValue = maxCountOfGlItem;
    if (overItemNumberFlag === false) {
      setOverItemNumberFlag(true);
    }
  }

  return (
    <>
      <Grid container>
        {drawItemCount > 0 ? (
          createCustomLengthArray(resultGlItemCountValue).map(
            (__NOT_USED_VALUE__, currentIndex) => {
              return (
                <DrawItemContext.Provider
                  value={{
                    hasCanMultiCollectionType,
                    drawItemOrder: currentIndex,
                  }}
                  key={
                    Array.isArray(drawItemKeys) && drawItemKeys.length > 0
                      ? drawItemKeys[currentIndex]
                      : 'singleDrawItem'
                  }
                >
                  <GlItemOrderContextElement value={currentIndex}>
                    <Box width={1 / drawBoxRowCount}>
                      <DrawItemContainer />
                    </Box>
                  </GlItemOrderContextElement>
                </DrawItemContext.Provider>
              );
            }
          )
        ) : (
          <DefaultWelcome />
        )}
      </Grid>
      <NoticeSnackbar
        open={overItemNumberFlag}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <CustomAlert
          onClose={handleSnackbarClose}
          severity="warning"
          disableClose
        >
          アイテムの数は最大で14個です。14個以下になるようにアイテムを減らしてください。
        </CustomAlert>
      </NoticeSnackbar>
    </>
  );
};

export default DrawBox;
