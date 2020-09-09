import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';

import Icon from '../../atoms/Icon';

type Props = {
  storeUpdateOpacityValue: any;
  targetOpacityValueId: string | string[];
  storedOpacityValue: any;
  isShowInputArea?: boolean;
  isArrayStoredData: boolean;
  isShowBeforeIcon?: boolean;
  sliderStopCheckTime?: number | null;
  sliderMaxWidth?: number;
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

// function toNormalNumber2GlNumber(inputNumber: number) {
//   return inputNumber * 0.01;
// }

// function toGlNumber2NormalNumber(inputNumber: number) {
//   return inputNumber * 100;
// }

/**
 * 透過度のスライダーコンポーネント
 * @todo Opacityだけでなく汎用性をもたせたい
 */
const OpacitySlider: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const {
    storeUpdateOpacityValue,
    targetOpacityValueId,
    isShowInputArea,
    isShowBeforeIcon,
    sliderStopCheckTime,
    sliderMaxWidth,
    storedOpacityValue,
  } = props;

  const styles = {
    sliderMaxWidth: css`
      max-width: ${sliderMaxWidth}px;
    `,
  };

  /**
   * デフォルトのカラーをグローバルのstateから取得する
   */
  const defaultOpacityValue = (): number => {
    if (Array.isArray(storedOpacityValue)) {
      return storedOpacityValue[0].value * 100;
    }
    if (
      typeof storedOpacityValue.value === 'number' &&
      !Number.isNaN(storedOpacityValue.value)
    ) {
      return storedOpacityValue.value * 100;
    }
    return 100;
  };
  const [opacityState, setOpacityState] = useState(defaultOpacityValue);
  const [tempOnChangeState, setTempOnChangeState] = useState(false);
  const [tempOnChangeCommitState, setTempOnChangeCommitState] = useState(false);

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
  const handleChangeCommitted = () => {
    storeUpdateOpacityValue({
      targetId: targetOpacityValueId,
      targetIdNewValue: opacityState * 0.01,
    });
    setTempOnChangeCommitState(true);
    setTempOnChangeState(false);
  };

  /**
   * 透過度スライダーの脇の文字列入力inputを変更した際のイベント
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacityState(event.target.value === '' ? 0 : Number(event.target.value));
    storeUpdateOpacityValue({
      targetId: targetOpacityValueId,
      targetIdNewValue:
        event.target.value === '' ? '' : Number(event.target.value) * 0.01,
    });
  };

  /**
   * input変更時のブラーイベント
   */
  const handleBlur = () => {
    if (!Array.isArray(storedOpacityValue)) {
      if (storedOpacityValue.value < 0) {
        storeUpdateOpacityValue({
          targetId: targetOpacityValueId,
          targetIdNewValue: 0.0,
        });
      } else if (storedOpacityValue.value > 100) {
        storeUpdateOpacityValue({
          targetId: targetOpacityValueId,
          targetIdNewValue: 1.0,
        });
      }
    }
  };

  /**
   * スライダーを一定時間保持しつづけるとreduxのglobalのstateが更新される関数
   */
  useEffect(() => {
    if (sliderStopCheckTime !== null && sliderStopCheckTime !== undefined) {
      const timer = setTimeout(() => {
        if (tempOnChangeState === true && tempOnChangeCommitState === false) {
          storeUpdateOpacityValue({
            targetId: targetOpacityValueId,
            targetIdNewValue: opacityState * 0.01,
          });
        }
      }, sliderStopCheckTime);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [
    tempOnChangeState,
    tempOnChangeCommitState,
    storeUpdateOpacityValue,
    opacityState,
    targetOpacityValueId,
    sliderStopCheckTime,
  ]);

  return (
    <Box width={1}>
      <Typography gutterBottom className={classes.label}>
        透過度
      </Typography>
      <Grid container spacing={2}>
        {isShowBeforeIcon && (
          <Grid item>
            <Icon type="opacityPanel" />
          </Grid>
        )}
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
            css={sliderMaxWidth && styles.sliderMaxWidth}
          />
        </Grid>
        {isShowInputArea && (
          <Grid item>
            <Input
              className={classes.input}
              value={opacityState}
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
        )}
      </Grid>
    </Box>
  );
};

export default OpacitySlider;
