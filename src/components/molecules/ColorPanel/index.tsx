import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
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

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  })
);

/**
 * カラーパネルコンポーネント
 * @todo ピッカーのデフォルトプリセットカラーの設定
 */
export default (props: Props) => {
  const { updateColor, globalStateColorData } = props;
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [currentColorBoxKey, setCurrentColorBoxKey] = useState(0);
  const classes = useStyles();
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
    /* @todo カラーピッカーのサイズを変更できるようにしたいです */
    max-width: 250px !important;
    padding: 0px !important;
    background: transparent !important;
    border-radius: 0px !important;
    box-shadow: none !important;
    .flexbox-fix {
      /* @todo 背景色は変数化したいです */
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
    if (typeof globalStateColorData === 'string') {
      updateColor({
        colorValue: event.hex,
        glCollectionOrderKey,
      });
    }
    if (Array.isArray(globalStateColorData)) {
      let newColorState = globalStateColorData.map((val: any) => val);
      newColorState = newColorState.map((val: any, currentIndex: number) => {
        if (currentIndex === currentColorBoxKey) {
          return event.hex;
        }
        return val;
      });
      updateColor({
        colorValue: newColorState,
        glCollectionOrderKey,
      });
    }
  };

  /**
   * 単色ボタンを押したときに発火する関数
   * @param itemKey
   */
  const handleColorBoxClick = (itemKey: any): void => {
    setCurrentColorBoxKey(itemKey);
    if (typeof globalStateColorData === 'string') {
      setColorValue(globalStateColorData);
    }
    if (Array.isArray(globalStateColorData)) {
      setColorValue(globalStateColorData[itemKey]);
    }
  };

  /**
   * カラーピッカーの値が変化したときに発火する関数
   * @param event
   */
  const handleColorChange = (event: { hex: string }): void => {
    setColorValue(event.hex);
  };

  const ColorBox = (colorBoxProps: any) => {
    const { backgroundColor, itemKey } = colorBoxProps;
    const style = css`
      padding: 9px !important;
      position: relative;
      background-color: ${backgroundColor};
      cursor: pointer;
      border-radius: ${currentColorBoxKey === itemKey ? '30%' : '0%'};
      border: 2px solid
        ${currentColorBoxKey === itemKey
          ? 'rgba(255,255,255,1)'
          : 'rgba(0,0,0,0)'};
    `;
    return (
      <Grid item xs>
        <Paper
          css={style}
          onClick={() => handleColorBoxClick(itemKey)}
          elevation={0}
          className={classes.paper}
          square
        />
      </Grid>
    );
  };

  const ColorBoxes = () => {
    let colorBoxItems = [];
    if (typeof globalStateColorData === 'string') {
      colorBoxItems.push(
        <ColorBox backgroundColor={globalStateColorData} itemKey={0} />
      );
    }
    if (Array.isArray(globalStateColorData)) {
      // eslint-disable-next-line react/prop-types
      colorBoxItems = globalStateColorData.map(
        (singleColorData: string, currentIndex: number) => {
          return (
            <ColorBox
              backgroundColor={singleColorData}
              itemKey={currentIndex}
            />
          );
        }
      );
    }

    return (
      <Box ml={2}>
        <Grid container spacing={0}>
          {colorBoxItems}
        </Grid>
      </Box>
    );
  };

  return (
    <Box width={1}>
      <Typography gutterBottom>カラー</Typography>
      <Grid container spacing={4}>
        <Grid item>
          <Box display="flex" mb={1}>
            <ColorLensIcon />
            <ColorBoxes />
          </Box>
        </Grid>
      </Grid>
      <Box ml={4}>
        <SketchPicker
          color={colorValue}
          onChangeComplete={handleColorChangeComplete}
          onChange={handleColorChange}
          disableAlpha
          presetColors={[]}
          css={sketchPickerStyle}
        />
      </Box>
      <Box ml={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{ maxHeight: '25px' }}
        >
          カラーパネルを開く
        </Button>
      </Box>
    </Box>
  );
};
