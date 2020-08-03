import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

import OpacityIcon from '@material-ui/icons/Opacity';

import {
  GlCollectionInterfaceArray,
  GlCollectionInterface,
} from '../../../stores/collectionData';

type Props = {
  updateOpacity: any;
  collectionData: GlCollectionInterfaceArray;
  globalStateOpacityData: GlCollectionInterface['opacity'];
  glCollectionOrderKey: number;
};

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
const OpacitySlider: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { updateOpacity, globalStateOpacityData, glCollectionOrderKey } = props;
  /**
   * デフォルトのカラーをグローバルのstateから取得する
   */
  const defaultOpacityValue = (): number => {
    if (Array.isArray(globalStateOpacityData)) {
      return globalStateOpacityData[0] * 100;
    }
    if (
      typeof globalStateOpacityData === 'number' &&
      !Number.isNaN(globalStateOpacityData)
    ) {
      return globalStateOpacityData * 100;
    }
    return 100;
  };
  const [opacityState, setOpacityState] = useState(defaultOpacityValue);
  const [tempOnChangeState, setTempOnChangeState] = useState(false);
  const [tempOnChangeCommitState, setTempOnChangeCommitState] = useState(false);
  const globalStateOpacityValue = globalStateOpacityData;

  /**
   * スライダー変更時のイベント。ローカルステートのみ変更する。
   * @param event
   * @param newValue 透過度の値
   * @todo 配列データが入ってきた際の対応(opacityが複数のパターンがある場合)
   */
  const handleChange = (
    event: React.ChangeEvent<{}>,
    eventValue: number | number[]
  ) => {
    if (!Array.isArray(eventValue)) {
      setOpacityState(eventValue);
    }
    setTempOnChangeCommitState(false);
    setTempOnChangeState(true);
  };

  /**
   * 透過度が確定した際にdispatchを実行する
   * @param event
   * @param value 透過度の値
   * @todo 配列データが入ってきた際の対応(opacityが複数のパターンがある場合)
   */
  const handleChangeCommitted = (
    event: React.ChangeEvent<{}>,
    value: number | number[]
  ) => {
    if (!Array.isArray(value)) {
      updateOpacity({
        opacityValue: opacityState * 0.01,
        glCollectionOrderKey,
      });
    }
    setTempOnChangeCommitState(true);
    setTempOnChangeState(false);
  };

  /**
   * 透過度スライダーの脇の文字列入力inputを変更した際のイベント
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacityState(event.target.value === '' ? 0 : Number(event.target.value));
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
      updateOpacity({
        opacityValue: 0.0,
        glCollectionOrderKey,
      });
    } else if (globalStateOpacityValue > 100) {
      updateOpacity({
        opacityValue: 1.0,
        glCollectionOrderKey,
      });
    }
  };

  /**
   * スライダーを一定時間保持しつづけるとreduxのglobalのstateが更新される関数
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (tempOnChangeState === true && tempOnChangeCommitState === false) {
        updateOpacity({
          opacityValue: opacityState * 0.01,
          glCollectionOrderKey,
        });
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [
    tempOnChangeState,
    tempOnChangeCommitState,
    glCollectionOrderKey,
    updateOpacity,
    opacityState,
  ]);

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
            value={opacityState}
            min={0}
            max={100}
            defaultValue={100}
            valueLabelDisplay="auto"
            onChange={handleChange}
            onChangeCommitted={handleChangeCommitted}
            aria-labelledby="opacity-slider"
          />
        </Grid>
        <Grid item>
          <Input
            className={classes.input}
            value={
              typeof globalStateOpacityValue === 'number'
                ? Math.floor(globalStateOpacityValue * 100)
                : null
            }
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
