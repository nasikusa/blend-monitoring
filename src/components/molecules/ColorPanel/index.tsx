import React, { useState, useContext } from 'react';
import { css } from '@emotion/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { ColorResult } from 'react-color';
import Icon from '../../atoms/Icon';

import CustomTooltip from '../../atoms/CustomTooltip';
import { GlCollectionOrderContext } from '../CollectionList';
import CustomSketchPicker from '../../atoms/CustomSketchPicker';
import ColorModalContainer from '../../../container/ColorModalContainer';
import ColorBox from '../../atoms/ColorBox';
import ColorBoxGroup from '../ColorBoxGroup';

import { ColorRelatedGlCollectionType } from '../../../types/collection/collectionData';

export type ColorPanelFunctionNames =
  | 'colorPanelAdd'
  | 'colorPanelDelete'
  | 'colorPanelSort'
  | 'colorPanelAddFav'
  | 'colorPanelDeleteFav'
  | 'colorPanelFill'
  | 'colorPanelExpand';

type Props = {
  updateColor: any;
  globalStateColorData?: Pick<ColorRelatedGlCollectionType, 'color'>['color'];
  stockedColorData: any;
  stockAddColor: any;
  stockRemoveColor: any;
};

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
  // const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [openColorPanelFlag, setOpenColorPanelFlag] = useState(false);
  const [currentColorBoxKey] = useState(0);
  const [isFillToScreenCurrentColor, setIsFillToScreenCurrentColor] = useState(
    false
  );
  const [isBigSketchPickerSize, setIsBigSketchPickerSize] = useState(false);

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

  /**
   * カラーパネルを開くハンドル関数
   */
  const handleColorPanelOpen = () => {
    setOpenColorPanelFlag(!openColorPanelFlag);
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
  // const handleCirclePickerChange = (color: ColorResult, event: any) => {
  //   /**
  //    * @todo ここの型どうすればええんや....。(parentNodeがundefinedである可能性があるので)
  //    */
  //   const pickerElement: HTMLDivElement =
  //     event.target.parentNode.parentNode.parentNode.parentNode;
  //   const pickerElementItems = Array.from(pickerElement.children);
  //   pickerElementItems.forEach(
  //     (singlePickerItem: any, currentIndex: number) => {
  //       const currentPickerItem = singlePickerItem;
  //       currentPickerItem.dataset.temp_order = currentIndex;
  //     }
  //   );
  //   const currentItemOrder = Number(
  //     event.target.parentNode.parentNode.parentNode.dataset.temp_order
  //   );
  //   setColorValue(color.hex);
  //   setCurrentColorBoxKey(currentItemOrder);
  // };

  const handleColorBoxSelect = () => {
    console.log('fire!');
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
  const handleRemoveColor = () => {
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
          <IconButton onClick={handleAddNewColor} css={colorPanelButtonStyle}>
            <Icon type="colorPanelAdd" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="選択しているカラーを削除"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton onClick={handleRemoveColor} css={colorPanelButtonStyle}>
            <Icon type="colorPanelDelete" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="カラーをソート"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton size="small" css={colorPanelButtonStyle}>
            <Icon type="colorPanelSort" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="カラーをストック"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton onClick={handleStockColor} css={colorPanelButtonStyle}>
            <Icon type="colorPanelAddFav" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="ストックしたカラーをすべて削除"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton
            onClick={handleStockColorRemove}
            css={colorPanelButtonStyle}
          >
            <Icon type="colorPanelDeleteFav" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="現在のカラーをパネルに映す"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton
            onClick={handleScreenFillColor}
            css={colorPanelButtonStyle}
          >
            <Icon type="colorPanelFill" />
          </IconButton>
        </CustomTooltip>
        <CustomTooltip
          title="カラーピッカーを拡大"
          enterDelay={defaultEnterDelayTime}
        >
          <IconButton
            onClick={handleSketchPickerSize}
            css={colorPanelButtonStyle}
          >
            <Icon type="colorPanelExpand" />
          </IconButton>
        </CustomTooltip>
      </Box>
    );
  };

  return (
    <>
      <Box
        width={1}
        style={{
          backgroundColor: isFillToScreenCurrentColor
            ? colorValue
            : 'transparent',
        }}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Box display="flex" mb={1}>
              <Box ml={2} display="flex">
                <ColorBoxGroup>
                  {Array.isArray(globalStateColorData) ? (
                    globalStateColorData.map((singleGlobalStateColorData) => {
                      return (
                        <ColorBox
                          shapeType="circle"
                          boxSpacing={1}
                          boxSize="medium"
                          bgColor={singleGlobalStateColorData}
                          onClick={handleColorBoxSelect}
                        />
                      );
                    })
                  ) : (
                    <ColorBox
                      shapeType="circle"
                      boxSpacing={1}
                      boxSize="medium"
                      bgColor={globalStateColorData}
                      onClick={handleColorBoxSelect}
                    />
                  )}
                </ColorBoxGroup>
              </Box>
            </Box>
            <Box display="flex" mb={1}>
              <ColorBoxFunctions />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box ml={4}>
              <CustomSketchPicker
                color={colorValue}
                onChangeComplete={handleColorChangeComplete}
                onChange={handleColorChange}
                disableAlpha
                presetColors={stockedColorData}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box ml={4}>
              <Button onClick={handleColorPanelOpen}>カラーパネルを開く</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <ColorModalContainer
        modalOpen={openColorPanelFlag}
        setModalOpen={setOpenColorPanelFlag}
      />
    </>
  );
};

export default ColorPanel;
