import React, { createContext, useState } from 'react';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import GlItem from '../../molecules/GlItem';
import { GlCollectionType } from '../../../stores/collectionData';
import { maxCountOfGlItem } from '../../../constants/appConstantSettings';

export const GlItemOrderContext = createContext(0);

export type Props = {
  glItemCount: number;
  glItemKeys: Pick<GlCollectionType, 'innerItemID'>['innerItemID'];
  glBoxRowCount: number;
};

/**
 * アラートコンポーネントのバツボタンを消すスタイル
 */
const snackBarStyle = css`
  .MuiAlert-action {
    display: none;
  }
`;

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

/**
 * glsl描画アイテムのラッパーコンポーネント
 * @todo 最大アイテム数以上のときに警告を表示する
 */
export default function GlBox(props: Props) {
  const { glItemCount, glItemKeys, glBoxRowCount } = props;
  const [glItemDivideNumber] = useState(1 / glBoxRowCount);
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

  const items = (() => {
    const itemsArray = [];
    for (let i = 0; i < resultGlItemCountValue; i += 1) {
      itemsArray.push(
        <GlItemOrderContext.Provider
          key={Array.isArray(glItemKeys) ? glItemKeys[i] : glItemKeys}
          value={i}
        >
          <Box width={glItemDivideNumber}>
            <GlItem />
          </Box>
        </GlItemOrderContext.Provider>
      );
    }
    return itemsArray;
  })();

  return (
    <>
      <Box display="flex" flexWrap="wrap">
        {items}
      </Box>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={overItemNumberFlag}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="warning" css={snackBarStyle}>
          アイテムの数は最大で14個です。14個以下になるようにアイテムを減らしてください。
        </Alert>
      </Snackbar>
    </>
  );
}
