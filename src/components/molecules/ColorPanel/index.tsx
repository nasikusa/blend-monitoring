import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { SketchPicker, CirclePicker, ColorResult } from 'react-color';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import DeleteIcon from '@material-ui/icons/Delete';
import AddBoxIcon from '@material-ui/icons/AddBox';
import SortIcon from '@material-ui/icons/Sort';
import StarIcon from '@material-ui/icons/Star';
import FormatColorFillIcon from '@material-ui/icons/FormatColorFill';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import CustomTooltip from '../../atoms/CustomTooltip';
import { GlCollectionOrderContext } from '../Collections';

import { ColorRelatedGlCollectionType } from '../../../stores/collectionData';

type Props = {
  updateColor: any;
  globalStateColorData?: Pick<ColorRelatedGlCollectionType, 'color'>['color'];
  stockedColorData: any;
  stockAddColor: any;
  stockRemoveColor: any;
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

const colorPanelButtonStyle = css`
  padding: 6px 6px;
`;

/**
 * カラーパネルコンポーネント
 * @todo ピッカーのデフォルトプリセットカラーの設定
 */
const ColorPanel: React.FC<Props> = (props: Props) => {
  const {
    updateColor,
    globalStateColorData,
    stockedColorData,
    stockAddColor,
    stockRemoveColor,
  } = props;
  const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [currentColorBoxKey, setCurrentColorBoxKey] = useState(0);
  const [isFillToScreenCurrentColor, setIsFillToScreenCurrentColor] = useState(
    false
  );
  const [isBigSketchPickerSize, setIsBigSketchPickerSize] = useState(false);
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

  /**
   * SketchPickerは一つのカラーしか持てないため、ここの値でそれを保存している
   */
  const [colorValue, setColorValue] = useState(defaultColorValue);
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);

  const bigSketchPickerStyle = css`
    max-width: initial !important;
  `;

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
        > div:nth-of-type(2) {
          /* 単色確認用のパネルのシャドー */
          box-shadow: none !important;
        }
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
  const handleColorChangeComplete = (event: ColorResult): void => {
    setColorValue(event.hex);
    if (typeof globalStateColorData === 'string') {
      updateColor({
        colorValue: event.hex,
        glCollectionOrderKey,
      });
    }
    if (Array.isArray(globalStateColorData)) {
      let newColorState = globalStateColorData.map((val: string) => val);
      newColorState = newColorState.map((val: string, currentIndex: number) => {
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
   * サークルピッカークリック時の関数
   * @param color
   * @param event
   */
  const handleCirclePickerChange = (color: ColorResult, event: any) => {
    /**
     * @todo ここの型どうすればええんや....。(parentNodeがundefinedである可能性があるので)
     */
    const pickerElement: HTMLDivElement =
      event.target.parentNode.parentNode.parentNode.parentNode;
    const pickerElementItems = Array.from(pickerElement.children);
    pickerElementItems.forEach(
      (singlePickerItem: any, currentIndex: number) => {
        const currentPickerItem = singlePickerItem;
        currentPickerItem.dataset.temp_order = currentIndex;
      }
    );
    const currentItemOrder = Number(
      event.target.parentNode.parentNode.parentNode.dataset.temp_order
    );
    setColorValue(color.hex);
    setCurrentColorBoxKey(currentItemOrder);
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

  const handleStockColor = () => {
    stockAddColor({ newColorValue: colorValue });
  };
  const handleStockColorRemove = () => {
    stockRemoveColor();
  };

  const handleScreenFillColor = () => {
    setIsFillToScreenCurrentColor(!isFillToScreenCurrentColor);
  };

  const handleSketchPickerSize = () => {
    setIsBigSketchPickerSize(!isBigSketchPickerSize);
  };

  /**
   * 小さいカラー確認用のアイテムが並んでいるもののラッパー。コンポーネントを返す。
   */
  const ColorBoxes = () => {
    const cirlcePickerColors = [];
    if (typeof globalStateColorData === 'string') {
      cirlcePickerColors.push(globalStateColorData);
    }
    if (Array.isArray(globalStateColorData)) {
      // eslint-disable-next-line react/prop-types
      globalStateColorData.forEach((singleColorData: string) => {
        cirlcePickerColors.push(singleColorData);
      });
    }

    return (
      <Box ml={2}>
        <Grid container spacing={0}>
          <CirclePicker
            onChange={handleCirclePickerChange}
            color={colorValue}
            colors={[...cirlcePickerColors]}
          />
        </Grid>
      </Box>
    );
  };

  /**
   * カラー確認用のアイテムの下にある、追加、削除などを行うエリアのコンポーネント
   * @todo まとめて一つの関数とかで入れたい
   */
  const ColorBoxFunctions = () => {
    const defaultEnterDelayTime = 1000;
    return (
      <Box ml={4}>
        <CustomTooltip
          title="新しいカラーを追加"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton
            onClick={handleAddNewColor}
            css={colorPanelButtonStyle}
            size="small"
          >
            <AddBoxIcon fontSize="small" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="選択しているカラーを削除"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton
            onClick={handlRemoveColor}
            css={colorPanelButtonStyle}
            size="small"
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="カラーをソート"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton size="small" css={colorPanelButtonStyle}>
            <SortIcon fontSize="small" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="カラーをストック"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton
            onClick={handleStockColor}
            css={colorPanelButtonStyle}
            size="small"
          >
            <StarIcon fontSize="small" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="ストックしたカラーをすべて削除"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton
            onClick={handleStockColorRemove}
            css={colorPanelButtonStyle}
            size="small"
          >
            <StarBorderIcon fontSize="small" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="現在のカラーをパネルに映す"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton
            onClick={handleScreenFillColor}
            css={colorPanelButtonStyle}
            size="small"
          >
            <FormatColorFillIcon fontSize="small" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="カラーピッカーを拡大"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton
            onClick={handleSketchPickerSize}
            css={colorPanelButtonStyle}
            size="small"
          >
            <ZoomOutMapIcon fontSize="small" />
          </IconButton>
        </CustomTooltip>
      </Box>
    );
  };

  return (
    <Box
      width={1}
      style={{
        backgroundColor: isFillToScreenCurrentColor
          ? colorValue
          : 'transparent',
      }}
    >
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
              presetColors={stockedColorData}
              css={
                isBigSketchPickerSize
                  ? [sketchPickerStyle, bigSketchPickerStyle]
                  : sketchPickerStyle
              }
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
