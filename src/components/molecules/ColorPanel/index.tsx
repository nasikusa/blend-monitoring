import React, { useState } from 'react';
import { batch } from 'react-redux';
import { css } from '@emotion/core';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { v4 as uuidv4 } from 'uuid';
import Icon from '../../atoms/Icon';

import CustomTooltip from '../../atoms/CustomTooltip';
import CustomSketchPicker from '../../atoms/CustomSketchPicker';
import ColorModalContainer from '../../../container/ColorModalContainer';
import ColorBox from '../../atoms/ColorBox';
import ColorBoxGroup from '../ColorBoxGroup';
import { collectionValueColorType } from '../../../stores/collection/collectionValueColor';
import { CollectionCategoryType } from '../../../stores/collection/collection';

export type ColorPanelFunctionNames =
  | 'colorPanelAdd'
  | 'colorPanelDelete'
  | 'colorPanelSort'
  | 'colorPanelAddFav'
  | 'colorPanelDeleteFav'
  | 'colorPanelFill'
  | 'colorPanelExpand';

type Props = {
  stockedColorData: any;
  storedColorValue: collectionValueColorType | collectionValueColorType[];
  rawCollectionData: CollectionCategoryType;
  storeUpdateCollectionValueColorValue: any;
  storeAddCollectionValueColor: any;
  storeAddCollectionItem: any;
  storeAddCollectionInnerItem: any;
  storeDeleteCollectionInnerItem: any;
  stockRemoveColor: any;
  stockAddColor: any;
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
    stockedColorData,
    storedColorValue,
    rawCollectionData,
    storeUpdateCollectionValueColorValue,
    storeAddCollectionValueColor,
    storeAddCollectionItem,
    storeAddCollectionInnerItem,
    storeDeleteCollectionInnerItem,
    stockRemoveColor,
    stockAddColor,
  } = props;
  // const [colorPickerOpen, setColorPickerOpen] = useState(false);
  const [openColorPanelFlag, setOpenColorPanelFlag] = useState(false);
  const [currentColorBoxKey, setCurrentColorBoxKey] = useState(0);
  const [isFillToScreenCurrentColor, setIsFillToScreenCurrentColor] = useState(
    false
  );
  const [isBigSketchPickerSize, setIsBigSketchPickerSize] = useState(false);

  /**
   * デフォルトのカラーをグローバルのstateから取得する
   */
  const defaultColorValue = (): string => {
    if (Array.isArray(storedColorValue) && storedColorValue.length > 0) {
      return storedColorValue[0].value;
    }
    if (!Array.isArray(storedColorValue)) {
      return storedColorValue.value;
    }
    return '#000000';
  };

  /**
   * SketchPickerは一つのカラーしか持てないため、ここの値でそれを保存している
   */
  const [colorValue, setColorValue] = useState(defaultColorValue);

  /**
   * カラーパネルを開くハンドル関数
   */
  const handleColorPanelOpen = () => {
    setOpenColorPanelFlag(!openColorPanelFlag);
  };

  /**
   * カラーピッカーを選択し終えたとき、もしくはカラーが一定時間(0.5sくらい？)
   * 変わらなかった場合に発火する関数
   * @todo 決めた一定時間後に発火できるようにしたいです
   */
  const handleColorChangeComplete = (): void => {
    if (!Array.isArray(storedColorValue)) {
      storeUpdateCollectionValueColorValue({
        targetId: storedColorValue.id,
        targetIdNewValue: colorValue,
      });
    }
    if (Array.isArray(storedColorValue)) {
      storeUpdateCollectionValueColorValue({
        targetId: storedColorValue[currentColorBoxKey].id,
        targetIdNewValue: colorValue,
      });
    }
  };

  const handleColorBoxSelect = (
    newColorValue: string,
    currentItemOrder: number
  ) => {
    if (newColorValue != null) {
      setColorValue(newColorValue);
      setCurrentColorBoxKey(currentItemOrder);
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
    if (Array.isArray(storedColorValue)) {
      const targetCollectionItemId = uuidv4();
      const targetCollectionValueId = uuidv4();
      batch(() => {
        if (rawCollectionData.type === 'multiColors') {
          storeAddCollectionValueColor({
            targetId: targetCollectionValueId,
            targetNewValue: '#000000',
          });
          storeAddCollectionItem({
            targetId: targetCollectionItemId,
            targetType: rawCollectionData.roughType,
            targetBlendModeId: rawCollectionData.defaultBlendModeId,
            targetOpacityId: rawCollectionData.defaultOpacityId,
            targetVisibilityId: rawCollectionData.defaultVisibilityId,
            targetColorId: targetCollectionValueId,
          });
          storeAddCollectionInnerItem({
            addIndexType: 'first',
            targetInnerItemId: targetCollectionItemId,
            targetId: rawCollectionData.id,
          });
        }
      });
    }
  };

  /**
   * カラーを削除するアイコンをクリックしたときに発火する関数
   */
  const handleRemoveColor = () => {
    if (Array.isArray(storedColorValue)) {
      storeDeleteCollectionInnerItem({
        targetId: rawCollectionData.id,
        targetInnerId: rawCollectionData.innerItemId[currentColorBoxKey],
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
                  {Array.isArray(storedColorValue) ? (
                    storedColorValue.map(
                      (singleGlobalStateColorData, currentIndex) => {
                        return (
                          <ColorBox
                            shapeType="circle"
                            boxSize="medium"
                            activeStyleType={['scale', 'border']}
                            active={currentColorBoxKey === currentIndex}
                            bgColor={
                              currentColorBoxKey === currentIndex
                                ? colorValue
                                : singleGlobalStateColorData.value
                            }
                            onClick={() => {
                              handleColorBoxSelect(
                                singleGlobalStateColorData.value,
                                currentIndex
                              );
                            }}
                          />
                        );
                      }
                    )
                  ) : (
                    <ColorBox
                      shapeType="circle"
                      boxSize="medium"
                      bgColor={colorValue}
                      onClick={() => {
                        handleColorBoxSelect(storedColorValue.value, 0);
                      }}
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
