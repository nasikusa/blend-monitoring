import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

import OpacityIcon from '@material-ui/icons/Opacity';

import { GlCollectionOrderContext } from '../Collections';

/**
 * mateiral uiのカスタムスタイル
 */
const useStyles = makeStyles({
  input: {
    width: 52,
  },
  label: {
    fontSize: `12px`,
  },
});

/**
 * 透過度のスライダーコンポーネント
 * @todo Opacityだけでなく汎用性をもたせたい
 */
const OpacitySlider: React.FC = (props: any) => {
  // const [opacity, setOpacity] = React.useState<
  //   number | string | Array<number | string>
  // >(100);
  const classes = useStyles();
  const { updateOpacity, collectionData } = props;
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  const globalStateOpacityValue = collectionData[glCollectionOrderKey].opacity;

  /**
   * スライダー変更時のイベント
   * @param event
   * @param newValue 透過度の値
   */
  const handleChange = (event: any, value: number | number[]) => {
    if (!Array.isArray(value)) {
      updateOpacity({
        opacityValue: value * 0.01,
        glCollectionOrderKey,
      });
    }
  };

  /**
   * 透過度スライダーの脇の文字列入力inputを変更した際のイベント
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // setOpacity(event.target.value === '' ? '' : Number(event.target.value));
    updateOpacity({
      opacityValue:
        event.target.value === '' ? '' : Number(event.target.value) * 0.01,
      glCollectionOrderKey,
    });
  };

  /**
   * input変更時のブラーイベント
   */
  const handleBlur = () => {
    if (globalStateOpacityValue < 0) {
      // setOpacity(0);
      updateOpacity({
        opacityValue: 0.0,
        glCollectionOrderKey,
      });
    } else if (globalStateOpacityValue > 100) {
      // setOpacity(100);
      updateOpacity({
        opacityValue: 1.0,
        glCollectionOrderKey,
      });
    }
  };

  return (
    <Box width={1}>
      <Typography gutterBottom className={classes.label}>
        透過度
      </Typography>
      <Grid container spacing={2}>
        <Grid item>
          <OpacityIcon />
        </Grid>
        <Grid item xs>
          <Slider
            value={
              typeof globalStateOpacityValue === 'number'
                ? Math.floor(globalStateOpacityValue * 100)
                : 0
            }
            min={0}
            max={100}
            valueLabelDisplay="auto"
            onChange={handleChange}
            aria-labelledby="opacity-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={Math.floor(globalStateOpacityValue * 100)}
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
};

export default OpacitySlider;
