import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {
  readyBlendModeArray,
  readyBlendModeData,
  // getBoolStateBlendObject,
} from '../../../utils/GetBlendModeData';
import { GlCollectionOrderContext } from '../Collections';
import { GlCollectionInterfaceArray } from '../../../stores/collectionData';

export type Props = {
  collectionData: GlCollectionInterfaceArray;
  updateBlendMode: any;
};

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: 'flex',
      background: `rgba(0,0,0,0.7)`,
      padding: `30px`,
      borderRadius: `10px`,
    },
    formControl: {
      //   margin: theme.spacing(3),
    },
    formLabel: {
      width: `200px`,
      transition: `background-color 0.15s ease`,
      '&:hover': {
        backgroundColor: `rgba(255,255,255,0.3)`,
      },
      userSelect: `none`,
    },
  })
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
  brightnessPlusBlendMode,
  brightnessPlusMinusBlendMode,
  brightnessMinusBlendMode,
  mathBlendMode,
];

export default (props: Props) => {
  const classes = useStyles();
  const { collectionData, updateBlendMode } = props;
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
    });
  };
  const checkBoxes = CategoryBlendMode.map((oneCategoryBlendMode) => {
    const labels = oneCategoryBlendMode.map((blendModeData) => {
      let checkBoxValue = false;
      if (Array.isArray(boolBlendModeStateObject)) {
        checkBoxValue = boolBlendModeStateObject.includes(blendModeData.mode);
      } else {
        checkBoxValue = boolBlendModeStateObject === blendModeData.mode;
      }

      return (
        <FormControlLabel
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
      <FormControl component="fieldset" className={classes.formControl}>
        <FormGroup>{labels}</FormGroup>
      </FormControl>
    );
  });

  return <div className={classes.root}>{checkBoxes}</div>;
};