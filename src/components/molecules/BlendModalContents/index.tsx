import React, { useContext, useState } from 'react';
import { css } from '@emotion/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PanoramaFishEyeIcon from '@material-ui/icons/PanoramaFishEye';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Divider from '@material-ui/core/Divider';

import Brightness3Icon from '@material-ui/icons/Brightness3';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import DialpadIcon from '@material-ui/icons/Dialpad';

import {
  readyBlendModeArray,
  readyBlendModeData,
} from '../../../utils/GetBlendModeData';
import { GlCollectionOrderContext } from '../Collections';
import { GlCollectionTypeArray } from '../../../stores/collectionData';

export type Props = {
  collectionData: GlCollectionTypeArray;
  updateBlendMode: any;
  blendModeOrder: string[];
  canDisplayNormalBlend: boolean;
  canDispalyLighterBlend: boolean;
  canDisplayLighterAndDarkerBlend: boolean;
  canDisplayDarkerBlend: boolean;
  canDisplayMathBlend: boolean;
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
      padding: `10px`,
    },
    formControl: {},
    formLabel: {
      width: `150px`,
      paddingLeft: '15px',
      marginLeft: '5px',
      marginRight: '5px',
      transition: `background-color 0.15s ease`,
      '&:hover': {
        backgroundColor: `rgba(255,255,255,0.15)`,
      },
      userSelect: `none`,
    },
  })
);

const NormalBlendMode = readyBlendModeArray.filter(
  (singleBlendModeData) => singleBlendModeData.mode === `normal`
);
const brightnessPlusBlendMode = readyBlendModeArray.filter(
  (singleBlendModeData) => singleBlendModeData.type.brightness === `+`
);
const brightnessPlusMinusBlendMode = readyBlendModeArray.filter(
  (singleBlendModeData) => singleBlendModeData.type.brightness === `+-`
);
const brightnessMinusBlendMode = readyBlendModeArray.filter(
  (singleBlendModeData) => singleBlendModeData.type.brightness === `-`
);
const mathBlendMode = readyBlendModeArray.filter(
  (singleBlendModeData) => singleBlendModeData.type.base === `math`
);

// const hslBlendMode = readyBlendModeArray.filter(
//   (singleBlendModeData) => singleBlendModeData.type.base === `hsl`
// );

/**
 * 描画モードモーダルの中のコンテンツのReactFC
 */
export default function BlendModalContents(props: Props) {
  const classes = useStyles();
  const {
    collectionData,
    updateBlendMode,
    blendModeOrder,
    canDisplayNormalBlend,
    canDispalyLighterBlend,
    canDisplayLighterAndDarkerBlend,
    canDisplayDarkerBlend,
    canDisplayMathBlend,
  } = props;
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  let boolBlendModeStateObject = collectionData[glCollectionOrderKey].blendMode;
  if (typeof boolBlendModeStateObject === 'string') {
    boolBlendModeStateObject = [boolBlendModeStateObject];
  }
  const [isInsertDividerState, setIsInsertDividerState] = useState(false);

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
      flagState: canDispalyLighterBlend,
    },
    {
      data: mathBlendMode,
      name: 'math',
      flagState: canDisplayMathBlend,
    },
    // {
    //   data: hslBlendMode,
    //   name: 'hsl',
    //   flagState: true,
    // },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateBlendMode({
      blendMode: event.target.name,
      boolValue: event.target.checked,
      glCollectionOrderKey,
      blendModeOrder,
    });
  };

  /**
   * 描画モードのチェックボックスが集まった要素
   */
  const checkBoxes = categoryBlendModeData.map(
    (oneCategoryBlendMode, currentIndex: number) => {
      /**
       * divideコンポーネントが入る可能性のある変数
       */
      let divideElement = <></>;
      if (isInsertDividerState === false) {
        setIsInsertDividerState(true);
      } else {
        divideElement = <Divider absolute orientation="vertical" />;
      }

      /**
       * 単一の描画モードのチェックボックス要素
       */
      const oneCategoryLabels = oneCategoryBlendMode.data.map(
        (blendModeData) => {
          /**
           * チェックボックスのbool値を保存しておくための変数
           */
          let checkBoxValue = false;
          if (Array.isArray(boolBlendModeStateObject)) {
            checkBoxValue = boolBlendModeStateObject.includes(
              blendModeData.mode
            );
          } else {
            checkBoxValue = boolBlendModeStateObject === blendModeData.mode;
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
                  onChange={handleChange}
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
              {currentIndex === 0 ? (
                <PanoramaFishEyeIcon color="primary" />
              ) : (
                ''
              )}
              {currentIndex === 1 ? <Brightness3Icon color="primary" /> : ''}
              {currentIndex === 2 ? (
                <>
                  <Brightness3Icon color="primary" />
                  <WbSunnyIcon color="primary" />
                </>
              ) : (
                ''
              )}
              {currentIndex === 3 ? <WbSunnyIcon color="primary" /> : ''}
              {currentIndex === 4 ? <DialpadIcon color="primary" /> : ''}
            </FormLabel>
            <FormGroup>{oneCategoryLabels}</FormGroup>
          </FormControl>
        );
      }
      return <></>;
    }
  );

  return <div className={classes.root}>{checkBoxes}</div>;
}
