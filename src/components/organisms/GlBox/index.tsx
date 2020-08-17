import React, { createContext, useState } from 'react';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { useTheme } from '@material-ui/core/styles';

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

const fullStyle = css`
  width: 100%;
  height: calc(100vh - 50px);

  @media (max-width: 1200px) {
    display: none;
  }
`;

const descriptionStyle = css`
  line-height: 2;
  letter-spacing: 2px;
`;

const logoImageBackStyle = css`
  background-color: #232323;
  border-radius: 50%;
  padding: 20px;
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
  const theme = useTheme();

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
      <Grid container>
        {glItemCount > 0 ? (
          items
        ) : (
          <Grid container justify="center" alignItems="center" css={fullStyle}>
            <Paper
              elevation={14}
              style={{
                backgroundColor: '#ddd',
                color: theme.palette.background.default,
              }}
            >
              <Grid container alignItems="center">
                <Box
                  display="flex"
                  justifyContent="center"
                  pl={6}
                  pr={4}
                  py={6}
                >
                  <img
                    css={logoImageBackStyle}
                    src="/logo512.png"
                    alt="ロゴ画像"
                    width="180"
                    height="180"
                  />
                </Box>
                <Box ml={2} pr={10}>
                  <Typography
                    display="block"
                    css={descriptionStyle}
                    align="center"
                    gutterBottom
                  >
                    BlendMonitoringは
                    <br />
                    画像やテクスチャ、カラー、描画モードなどの
                    <br />
                    複数の色の組み合わせを
                    <br />
                    一度に確認できる
                    <br />
                    カラーグレーディングツールです。
                  </Typography>
                  <Divider />
                  <Typography display="block" variant="overline" align="center">
                    バージョン : 0.1.0
                  </Typography>
                  <Typography display="block" variant="overline" align="center">
                    2020 / 07 / 25 ~
                  </Typography>
                </Box>
              </Grid>
            </Paper>
          </Grid>
        )}
      </Grid>
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
