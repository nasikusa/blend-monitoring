import React, { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

import GlItemContainer from '../../../container/GlItemContainer';
import DefaultWelcome from '../../molecules/DefaultWelcome';
import { GlCollectionType } from '../../../types/collection/collectionData';
import { maxCountOfGlItem } from '../../../constants/general/appConstantSettings';
import CustomAlert from '../../atoms/CustomAlert';
import NoticeSnackbar from '../../atoms/NoticeSnackbar';
import GlItemOrderContextElement from './GlItemOrderContextElement';
import createCustomLengthArray from '../../../utils/general/createCustomLengthArray';

export type Props = {
  glItemCount: number;
  glItemKeys: Pick<GlCollectionType, 'innerItemId'>['innerItemId'];
  glBoxRowCount: number;
};
/**
 * glsl描画アイテムのラッパーコンポーネント
 * @todo 最大アイテム数以上のときに警告を表示する
 */
export default function GlBox(props: Props) {
  const { glItemCount, glItemKeys, glBoxRowCount } = props;
  const [overItemNumberFlag, setOverItemNumberFlag] = useState(false);

  const handleClose = () => {
    setOverItemNumberFlag(false);
  };

  /**
   * 最大のglItem数を考慮した表示されるアイテム数
   */
  let resultGlItemCountValue = glItemCount;
  if (resultGlItemCountValue > maxCountOfGlItem) {
    resultGlItemCountValue = maxCountOfGlItem;
    if (overItemNumberFlag === false) {
      setOverItemNumberFlag(true);
    }
  }

  return (
    <>
      <Grid container>
        {glItemCount > 0 ? (
          createCustomLengthArray(resultGlItemCountValue).map(
            (__NOT_USED_VALUE__, currentIndex) => {
              return (
                <GlItemOrderContextElement
                  key={
                    Array.isArray(glItemKeys)
                      ? glItemKeys[currentIndex]
                      : glItemKeys
                  }
                  value={currentIndex}
                >
                  <Box width={1 / glBoxRowCount}>
                    <GlItemContainer />
                  </Box>
                </GlItemOrderContextElement>
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
        onClose={handleClose}
      >
        <CustomAlert onClose={handleClose} severity="warning" disableClose>
          アイテムの数は最大で14個です。14個以下になるようにアイテムを減らしてください。
        </CustomAlert>
      </NoticeSnackbar>
    </>
  );
}
