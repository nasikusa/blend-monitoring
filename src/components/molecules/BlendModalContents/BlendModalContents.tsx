import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

/* eslint-disable import/no-unresolved */
import {
  readyBlendModeArray,
  readyBlendModeData,
} from 'utils/blendMode/getBlendModeData';
import { collectionValueBlendModeType } from 'stores/collection/collectionValueBlendMode';
import { CollectionCategoryType } from 'stores/collection/collection';
import BlendModalSettingsContext from 'contexts/BlendModalSettingsContext';

/* eslint-enable import/no-unresolved */
import Icon from '../../atoms/Icon';

export type Props = {
  blendModalMode: 'single' | 'multi';
  storeUpdateCollectionValueBlendModeValue: any;
  storeDeleteCollectionInnerItem: any;
  storeAddCollectionInnerItemWithValue: any;
  blendModeOrder: string[];
  rawCollectionData: CollectionCategoryType;
  storedBlendModeValue:
    | collectionValueBlendModeType
    | collectionValueBlendModeType[];
};

/**
 * 各描画モードのチェックボタングループのアイコンのスタイル
 */
const iconCenterStyle = css`
  width: 100%;
  text-align: center;
  padding-bottom: 8px;
`;

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      padding: '10px',
    },
    formControl: {},
    formLabel: {
      width: '150px',
      paddingLeft: '15px',
      marginLeft: '5px',
      marginRight: '5px',
      transition: 'background-color 0.15s ease',
      '&:hover': {
        backgroundColor: 'rgba(255,255,255,0.15)',
      },
      userSelect: 'none',
    },
  })
);

const NormalBlendMode = readyBlendModeArray.filter(
  (singleBlendModeData) => singleBlendModeData.mode === 'normal'
);
const brightnessPlusBlendMode = readyBlendModeArray.filter(
  (singleBlendModeData) => singleBlendModeData.type.brightness === '+'
);
const brightnessPlusMinusBlendMode = readyBlendModeArray.filter(
  (singleBlendModeData) => singleBlendModeData.type.brightness === '+-'
);
const brightnessMinusBlendMode = readyBlendModeArray.filter(
  (singleBlendModeData) => singleBlendModeData.type.brightness === '-'
);
const mathBlendMode = readyBlendModeArray.filter(
  (singleBlendModeData) => singleBlendModeData.type.base === 'math'
);

/**
 * 描画モードモーダルの中のコンテンツのReactFC
 */
const BlendModalContents: React.FC<Props> = (props) => {
  const classes = useStyles();
  const {
    blendModalMode,
    storeUpdateCollectionValueBlendModeValue,
    storeDeleteCollectionInnerItem,
    storeAddCollectionInnerItemWithValue,
    rawCollectionData,
    storedBlendModeValue,
  } = props;
  const {
    canDisplayNormalBlend,
    canDisplayLighterBlend,
    canDisplayLighterAndDarkerBlend,
    canDisplayDarkerBlend,
    canDisplayMathBlend,
  } = useContext(BlendModalSettingsContext);

  // もらったデータを配列に変換している
  const blendModeStateObjectArray: collectionValueBlendModeType[] = (() => {
    if (!Array.isArray(storedBlendModeValue)) {
      return [storedBlendModeValue];
    }
    return storedBlendModeValue;
  })();

  /**
   * en: Array data containing only the name of the currently enabled drawing mode
   * ja: 現在、有効化されている描画モードの名前のみの入った配列データ
   */
  const blendModeNameArray: collectionValueBlendModeType['value'][] = blendModeStateObjectArray.map(
    (singleBoolBlendModeStateObject) => {
      return singleBoolBlendModeStateObject.value;
    }
  );

  /**
   * en: A bool value for whether to put a delimiter line next to the checkbox group.
   * ja: チェックボックスグループの脇に区切り用の線を入れるかどうかのbool値。
   */
  let isInsertDividerStateFlag = false;

  const categoryBlendModeData = [
    {
      data: NormalBlendMode,
      name: 'normal',
      flagState: canDisplayNormalBlend,
    },
    {
      data: brightnessMinusBlendMode,
      name: 'brightnessMinus',
      flagState: canDisplayDarkerBlend,
    },
    {
      data: brightnessPlusMinusBlendMode,
      name: 'brightnessPlusMinus',
      flagState: canDisplayLighterAndDarkerBlend,
    },
    {
      data: brightnessPlusBlendMode,
      name: 'brightnessPlus',
      flagState: canDisplayLighterBlend,
    },
    {
      data: mathBlendMode,
      name: 'math',
      flagState: canDisplayMathBlend,
    },
  ];

  const handleSingleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (!Array.isArray(storedBlendModeValue)) {
      storeUpdateCollectionValueBlendModeValue({
        targetId: storedBlendModeValue.id,
        targetNewValue: event.target.name,
      });
    } else if (
      rawCollectionData.type === 'multiColors' ||
      rawCollectionData.type === 'multiImages'
    ) {
      storeUpdateCollectionValueBlendModeValue({
        targetId: rawCollectionData.defaultBlendModeId,
        targetNewValue: event.target.name,
      });
    }
  };

  const handleMultiChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    targetIndex: number
  ): void => {
    if (event.target.checked) {
      storeAddCollectionInnerItemWithValue(event.target.name);
    } else if (!event.target.checked) {
      storeDeleteCollectionInnerItem({
        targetId: rawCollectionData.id,
        targetInnerId: rawCollectionData.innerItemId[targetIndex],
      });
    }
  };

  /**
   * 描画モードのチェックボックスが集まった要素
   * @todo 個別の描画モードグループごとに取り出せるように関数を分離したいかも
   * @todo 若干、内部処理がわかりにくい感じがあるので、機能を分離して、複数の関数にほうがいいのかも
   */
  const checkBoxesElementArray: React.ReactElement[] = categoryBlendModeData.map(
    (oneCategoryBlendMode, currentIndex: number) => {
      /**
       * divideコンポーネントが入る可能性のある変数
       */
      let divideElement = null;
      if (isInsertDividerStateFlag === false) {
        isInsertDividerStateFlag = true;
      } else {
        divideElement = <Divider absolute orientation="vertical" />;
      }

      /**
       * 単一の描画モードのチェックボックス要素
       */
      const oneCategoryLabels: React.ReactElement[] = oneCategoryBlendMode.data.map(
        (blendModeData) => {
          /**
           * チェックボックスのbool値を保存しておくための変数
           */
          let checkBoxValue = false;
          const checkIndex = blendModeNameArray.findIndex(
            (singleBlendModeName) => singleBlendModeName === blendModeData.mode
          );
          if (Array.isArray(blendModeNameArray)) {
            checkBoxValue = checkIndex !== -1;
          } else {
            checkBoxValue = blendModeNameArray === blendModeData.mode;
          }

          const checkBoxLabelName = (() => {
            const singleBlendModeData = readyBlendModeData[blendModeData.mode];
            if (singleBlendModeData != null) {
              return singleBlendModeData.name.ja;
            }
            return '';
          })();

          return (
            <FormControlLabel
              key={blendModeData.mode}
              control={
                <Checkbox
                  color="primary"
                  checked={checkBoxValue}
                  onChange={
                    blendModalMode === 'single'
                      ? handleSingleChange
                      : (e) => {
                          handleMultiChange(e, checkIndex);
                        }
                  }
                  name={blendModeData.mode}
                />
              }
              label={checkBoxLabelName}
              className={classes.formLabel}
            />
          );
        }
      );

      if (oneCategoryBlendMode.flagState) {
        return (
          <FormControl
            key={oneCategoryBlendMode.name}
            component="fieldset"
            className={classes.formControl}
          >
            {divideElement}
            <FormLabel css={iconCenterStyle} component="legend">
              {(() => {
                switch (currentIndex) {
                  case 0:
                    return <Icon type="blendModeNormal" />;
                  case 1:
                    return <Icon type="blendModeBrightnessMinus" />;
                  case 2:
                    return (
                      <>
                        <Icon type="blendModeBrightnessPlusMinus" />
                      </>
                    );
                  case 3:
                    return <Icon type="blendModeBrightnessPlus" />;
                  case 4:
                    return <Icon type="blendModeMath" />;
                  default:
                    return null;
                }
              })()}
            </FormLabel>
            <FormGroup>{oneCategoryLabels}</FormGroup>
          </FormControl>
        );
      }
      return <></>;
    }
  );

  return <div className={classes.root}>{checkBoxesElementArray}</div>;
};

export default BlendModalContents;
