import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import {readyBlendModeArray, readyBlendModeData} from '../../../utils/GetBlendModeData';

const useStyles = makeStyles((theme: Theme) =>
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
  }),
);

const blendModeEnglishNames = readyBlendModeArray.map(singleBlendModeData => {
    return singleBlendModeData.mode;
});

const brightnessPlusBlendMode = readyBlendModeArray.filter(singleBlendModeData => singleBlendModeData.type.brightness === `+`);
const brightnessPlusMinusBlendMode = readyBlendModeArray.filter(singleBlendModeData => singleBlendModeData.type.brightness === `+-`);
const brightnessMinusBlendMode = readyBlendModeArray.filter(singleBlendModeData => singleBlendModeData.type.brightness === `-`);
const mathBlendMode = readyBlendModeArray.filter(singleBlendModeData => singleBlendModeData.type.base === `math`);
const CategoryBlendMode = [
    brightnessPlusBlendMode,
    brightnessPlusMinusBlendMode,
    brightnessMinusBlendMode,
    mathBlendMode,
];


export default (props:any) => {
    
    const classes = useStyles();
    const { itemKey, collectionData } = props;
    const boolBlendModeStateObject = collectionData[itemKey].blendMode;
    const blendModeActiveState:any = boolBlendModeStateObject;
    const [state, setState] = React.useState(blendModeActiveState);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };
    
    

    const checkBoxes = CategoryBlendMode.map((oneCategoryBlendMode) => {
        const labels = oneCategoryBlendMode.map((blendModeData) => (
            <FormControlLabel
            control={<Checkbox color='primary' checked={state[blendModeData.mode]} onChange={handleChange} name={blendModeData.mode} />}
            label={readyBlendModeData[blendModeData.mode].name.ja}
            className={classes.formLabel}
            />
        ));
        return (
            <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    {labels}
                </FormGroup>
            </FormControl>
        );
    });

    return(
        <div className={classes.root}>
            {checkBoxes}
        </div>
    );
}