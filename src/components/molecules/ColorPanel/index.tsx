import React, { useState, useCallback } from 'react';
import { batch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { v4 as uuidv4 } from 'uuid';

import CustomSketchPicker from '../../atoms/CustomSketchPicker';
import ColorModalContainer from '../../../container/ColorModalContainer';
import ColorBox from '../../atoms/ColorBox';
import ColorBoxGroup from '../ColorBoxGroup';
import { collectionValueColorType } from '../../../stores/collection/collectionValueColor';
import { CollectionCategoryType } from '../../../stores/collection/collection';
import CustomIconButton from '../CustomIconButton';
import { IconTypeTypes } from '../../atoms/Icon';

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

  /**
   * ColorBoxコンポーネントがクリックされて選択されたときのイベント関数
   */
  const handleColorBoxSelect = useCallback((event: any) => {
    if (event.currentTarget.dataset.color != null) {
      setColorValue(event.currentTarget.dataset.color);
      setCurrentColorBoxKey(Number(event.currentTarget.dataset.index));
    }
  }, []);

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
  const handleAddNewColor = useCallback(() => {
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
  }, [
    storedColorValue,
    rawCollectionData,
    storeAddCollectionValueColor,
    storeAddCollectionItem,
    storeAddCollectionInnerItem,
  ]);

  /**
   * カラーを削除するアイコンをクリックしたときに発火する関数
   */
  const handleRemoveColor = useCallback(() => {
    if (Array.isArray(storedColorValue)) {
      storeDeleteCollectionInnerItem({
        targetId: rawCollectionData.id,
        targetInnerId: rawCollectionData.innerItemId[currentColorBoxKey],
      });
    }
  }, [
    storedColorValue,
    rawCollectionData,
    currentColorBoxKey,
    storeDeleteCollectionInnerItem,
  ]);

  const handleStockColor = useCallback(() => {
    stockAddColor({ newColorValue: colorValue });
  }, [colorValue, stockAddColor]);

  const handleStockColorRemove = useCallback(() => {
    stockRemoveColor();
  }, [stockRemoveColor]);

  const handleScreenFillColor = useCallback(() => {
    setIsFillToScreenCurrentColor(!isFillToScreenCurrentColor);
  }, [setIsFillToScreenCurrentColor, isFillToScreenCurrentColor]);

  const handleSketchPickerSize = useCallback(() => {
    setIsBigSketchPickerSize(!isBigSketchPickerSize);
  }, [setIsBigSketchPickerSize, isBigSketchPickerSize]);

  const customIconButtonData: {
    labelTitle: string;
    iconType: IconTypeTypes;
    handleFunction: (() => void) | null;
  }[] = [
    {
      labelTitle: '新しいカラーを追加',
      iconType: 'colorPanelAdd',
      handleFunction: handleAddNewColor,
    },
    {
      labelTitle: '選択しているカラーを削除',
      iconType: 'colorPanelDelete',
      handleFunction: handleRemoveColor,
    },
    {
      labelTitle: 'カラーをソート',
      iconType: 'colorPanelSort',
      handleFunction: null,
    },
    {
      labelTitle: 'カラーをストック',
      iconType: 'colorPanelAddFav',
      handleFunction: handleStockColor,
    },
    {
      labelTitle: 'ストックしたカラーをすべて削除',
      iconType: 'colorPanelDeleteFav',
      handleFunction: handleStockColorRemove,
    },
    {
      labelTitle: '現在のカラーをパネルに映す',
      iconType: 'colorPanelFill',
      handleFunction: handleScreenFillColor,
    },
    {
      labelTitle: 'カラーピッカーを拡大',
      iconType: 'colorPanelExpand',
      handleFunction: handleSketchPickerSize,
    },
  ];

  /**
   * カラー確認用のアイテムの下にある、追加、削除などを行うエリアのコンポーネント
   */
  const ColorPanelFunctionIconButtonGroup = () => {
    return customIconButtonData.map((singleCustomIconButtonData) => {
      return (
        <CustomIconButton
          key={singleCustomIconButtonData.iconType}
          type={singleCustomIconButtonData.iconType}
          buttonType="iconButton"
          labelTitle={singleCustomIconButtonData.labelTitle}
          onClick={singleCustomIconButtonData.handleFunction}
        />
      );
    });
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
              <Box display="flex">
                <ColorBoxGroup>
                  {Array.isArray(storedColorValue) ? (
                    storedColorValue.map(
                      (singleGlobalStateColorData, currentIndex) => {
                        return (
                          <ColorBox
                            key={singleGlobalStateColorData.id}
                            shapeType="circle"
                            boxSize="medium"
                            activeStyleType={['scale', 'border']}
                            active={currentColorBoxKey === currentIndex}
                            color={
                              currentColorBoxKey === currentIndex
                                ? colorValue
                                : singleGlobalStateColorData.value
                            }
                            data-color={singleGlobalStateColorData.value}
                            data-index={currentIndex}
                            onClick={handleColorBoxSelect}
                          />
                        );
                      }
                    )
                  ) : (
                    <ColorBox
                      shapeType="circle"
                      boxSize="medium"
                      color={colorValue}
                      data-color={colorValue}
                      data-index={0}
                      onClick={handleColorBoxSelect}
                    />
                  )}
                </ColorBoxGroup>
              </Box>
            </Box>
            <Box display="flex" flexWrap="wrap" mb={1}>
              {ColorPanelFunctionIconButtonGroup}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box>
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
            <Box>
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
