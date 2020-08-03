import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { SketchPicker } from 'react-color';
import ColorLensIcon from '@material-ui/icons/ColorLens';

import { GlCollectionOrderContext } from '../Collections';

import { GlCollectionInterface } from '../../../stores/collectionData';

type Props = {
  updateColor: any;
  globalStateColorData: GlCollectionInterface['color'];
};

/**
 * カラーパネルコンポーネント
 * @todo ピッカーのデフォルトプリセットカラーの設定
 */
export default (props: Props) => {
  const { updateColor, globalStateColorData } = props;
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  /**
   * デフォルトのカラーをグローバルのstateから取得する
   */
  const defaultColorValue = (): string => {
    if (Array.isArray(globalStateColorData)) {
      return globalStateColorData[0];
    }
    if (typeof globalStateColorData === 'string') {
      return globalStateColorData;
    }
    return '#000000';
  };
  const [colorValue, setColorValue] = useState(defaultColorValue);
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);

  /**
   * SketchPickerコンポーネントのスタイルを変更する。
   */
  const sketchPickerStyle = css`
    width: 100% !important;
    max-width: 250px !important;
    padding: 0px !important;
    background: transparent;
    border-radius: 0px;
    .flexbox-fix {
      /* 背景色は変数化したいです */
      background: #484848 !important;
    }
    > div:nth-of-type(2) {
      > div:nth-of-type(1) {
        > div:nth-of-type(1) {
          /* HUE変更用のバー */
          height: 20px !important;
          > div:nth-of-type(1) {
            > div:nth-of-type(1) {
              > div:nth-of-type(1) {
                > div:nth-of-type(1) {
                  /* HUEピッカーの白い選択バー */
                  height: 18px !important;
                }
              }
            }
          }
        }
      }
      > div:nth-of-type(2) {
        /* 単色確認用の色パネル */
        height: 20px !important;
      }
    }
    > div:nth-of-type(3) {
      > div {
        > div {
          > span {
            /* hex / r / g / b の文字のところ */
            padding-top: 7px !important;
            padding-bottom: 8px !important;
          }
        }
      }
    }
    span {
      /* 文字色の変更 */
      color: rgba(255, 255, 255, 1) !important;
    }
  `;

  /**
   * カラーピッカーパネルの開閉フラグ用の関数
   */
  const handleOpen = (): void => {
    setColorPickerOpen(!colorPickerOpen);
  };

  /**
   * カラーピッカーを選択し終えたとき、もしくはカラーが一定時間(0.5sくらい？)
   * 変わらなかった場合に発火する関数
   * @param event
   * @todo 決めた一定時間後に発火できるようにしたいです
   */
  const handleColorChangeComplete = (event: { hex: string }): void => {
    setColorValue(event.hex);
    updateColor({
      colorValue: event.hex,
      glCollectionOrderKey,
    });
  };

  /**
   * カラーピッカーの値が変化したときに発火する関数
   * @param event
   */
  const handleColorChange = (event: { hex: string }): void => {
    setColorValue(event.hex);
  };

  return (
    <Box width={1}>
      <Typography gutterBottom>カラー</Typography>
      <Grid container spacing={4}>
        <Grid item>
          <ColorLensIcon />
        </Grid>
      </Grid>
      <SketchPicker
        color={colorValue}
        onChangeComplete={handleColorChangeComplete}
        onChange={handleColorChange}
        disableAlpha
        presetColors={[]}
        css={sketchPickerStyle}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpen}
        style={{ maxHeight: '25px' }}
      >
        カラーパネルを開く
      </Button>
    </Box>
  );
};
