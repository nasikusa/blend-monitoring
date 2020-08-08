import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { SketchPicker } from 'react-color';
import ColorLensIcon from '@material-ui/icons/ColorLens';

import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SortIcon from '@material-ui/icons/Sort';

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
    label: {
      fontSize: '12px',
    },
  })
);

/**
 * カラーパネルコンポーネント
 * @todo ピッカーのデフォルトプリセットカラーの設定
 */
const ColorPanel: React.FC<Props> = (props: Props) => {
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
    max-width: 200px !important;
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

  /**
   * 新しいカラーを追加するアイコンをクリックしたときに発火する関数
   */
  const handleAddNewColor = () => {
    if (Array.isArray(globalStateColorData)) {
      const newColorState = [...globalStateColorData, '#000000'];
      updateColor({
        colorValue: newColorState,
        glCollectionOrderKey,
      });
    }
  };

  /**
   * カラーを削除するアイコンをクリックしたときに発火する関数
   */
  const handlRemoveColor = () => {
    if (Array.isArray(globalStateColorData)) {
      const newColorState = globalStateColorData.filter(
        (hexValue, currentIndex) => currentColorBoxKey !== currentIndex
      );
      updateColor({
        colorValue: newColorState,
        glCollectionOrderKey,
      });
    }
  };

  /**
   * カラー確認用の小さいコンポーネント。
   * @param colorBoxProps
   */
  const ColorBox = (colorBoxProps: any) => {
    const { backgroundColor, itemKey } = colorBoxProps;
    const gridStyle = css`
      flex-grow: 0 !important;
    `;
    const paperStyle = css`
      padding: 13px !important;
      position: relative;
      background-color: ${backgroundColor};
      cursor: pointer;
      border-radius: ${currentColorBoxKey === itemKey ? '10%' : '50%'};
      transform: scale(${currentColorBoxKey === itemKey ? '1.2' : '1.0'});
      z-index: ${currentColorBoxKey === itemKey ? '5' : '3'};
    `;
    return (
      <Grid item xs css={gridStyle}>
        <Paper
          css={paperStyle}
          onClick={() => handleColorBoxClick(itemKey)}
          elevation={0}
          className={classes.paper}
          square
        >
          {/* {itemKey} */}
        </Paper>
      </Grid>
    );
  };

  /**
   * 小さいカラー確認用のアイテムが並んでいるもののラッパー。コンポーネントを返す。
   */
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

  /**
   * カラー確認用のアイテムの下にある、追加、削除などを行うエリアのコンポーネント
   */
  const ColorBoxFunctions = () => {
    return (
      <Box ml={4}>
        <IconButton onClick={handleAddNewColor} size="small">
          <AddBoxIcon fontSize="small" />
        </IconButton>
        <IconButton size="small">
          <SortIcon fontSize="small" />
        </IconButton>
        <IconButton onClick={handlRemoveColor} size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Box>
    );
  };

  return (
    <Box width={1}>
      <Typography gutterBottom className={classes.label}>
        カラー
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box display="flex" mb={1}>
            <ColorLensIcon />
            <ColorBoxes />
          </Box>
          <Box display="flex" mb={1}>
            <ColorBoxFunctions />
          </Box>
        </Grid>
        <Grid item xs={12}>
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
        </Grid>
        <Grid item xs={12}>
          <Box ml={4}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={handleOpen}
            >
              カラーパネルを開く
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ColorPanel;
