import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

import OpacityIcon from '@material-ui/icons/Opacity';

const useStyles = makeStyles({
    input: {
        width: 52,
    },
    label: {
        fontSize: `12px`,
    }
  });
  
export default (props:any) => {

    const [opacity, setOpacity] = React.useState<number | string | Array<number | string>>(100);
    const classes = useStyles();
    const {itemKey} = props;

    const handleChange = (event: any, newValue: number | number[]) => {
        setOpacity(newValue as number);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setOpacity(event.target.value === '' ? '' : Number(event.target.value));
      };
    
    const handleBlur = () => {
    if (opacity < 0) {
        setOpacity(0);
    } else if (opacity > 100) {
        setOpacity(100);
    }
    };

    return (
        <Box width={1}>
            <Typography gutterBottom  className={classes.label}>
                透過度
            </Typography>
            <Grid container spacing={2}>
                <Grid item>
                    <OpacityIcon />
                </Grid>
                <Grid item xs>
                <Slider value={typeof opacity === 'number' ? opacity : 0} min={0} max={100} valueLabelDisplay="auto" onChange={handleChange} aria-labelledby="opacity-slider" />
                </Grid>
                <Grid item>
                    <Input
                        className={classes.input}
                        value={opacity}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                        step: 10,
                        min: 0,
                        max: 100,
                        type: 'number',
                        'aria-labelledby': 'input-slider',
                        }}
                    />
                </Grid>
            </Grid>
        </Box>
    );
}