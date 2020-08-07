import React, { useContext } from 'react';
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
import { GlCollectionInterfaceArray } from '../../../stores/collectionData';

export type Props = {
  collectionData: GlCollectionInterfaceArray;
  updateBlendMode: any;
  blendModeOrder: string[];
};

const iconCenterStyle = css`
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

const CategoryBlendMode = [
  NormalBlendMode,
  brightnessMinusBlendMode,
  brightnessPlusMinusBlendMode,
  brightnessPlusBlendMode,
  mathBlendMode,
];

/**
 * keyのための配列
 * @todo : 変更があったとき
 */
const categoryBlendModeKeys = [
  'normal',
  'brightnessPlus',
  'brightnessPlusMinus',
  'brightnessMinus',
  'math',
];

export default (props: Props) => {
  const classes = useStyles();
  const { collectionData, updateBlendMode, blendModeOrder } = props;
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  let boolBlendModeStateObject = collectionData[glCollectionOrderKey].blendMode;
  if (typeof boolBlendModeStateObject === 'string') {
    boolBlendModeStateObject = [boolBlendModeStateObject];
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateBlendMode({
      blendMode: event.target.name,
      boolValue: event.target.checked,
      glCollectionOrderKey,
      blendModeOrder,
    });
  };
  const checkBoxes = CategoryBlendMode.map(
    (oneCategoryBlendMode, currentIndex: number) => {
      const labels = oneCategoryBlendMode.map((blendModeData) => {
        let checkBoxValue = false;
        if (Array.isArray(boolBlendModeStateObject)) {
          checkBoxValue = boolBlendModeStateObject.includes(blendModeData.mode);
        } else {
          checkBoxValue = boolBlendModeStateObject === blendModeData.mode;
        }

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
            label={readyBlendModeData[blendModeData.mode].name.ja}
            className={classes.formLabel}
          />
        );
      });
      return (
        <FormControl
          key={categoryBlendModeKeys[currentIndex]}
          component="fieldset"
          className={classes.formControl}
        >
          {currentIndex !== 0 ? (
            <Divider absolute orientation="vertical" />
          ) : (
            ''
          )}
          <FormLabel css={iconCenterStyle} component="legend">
            {currentIndex === 0 ? <PanoramaFishEyeIcon color="primary" /> : ''}
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
          <FormGroup>{labels}</FormGroup>
        </FormControl>
      );
    }
  );

  return <div className={classes.root}>{checkBoxes}</div>;
};
