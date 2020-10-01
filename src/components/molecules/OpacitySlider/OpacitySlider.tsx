import React, { useState, useCallback } from 'react';
import { css } from '@emotion/core';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import { debounce } from 'lodash';

/* eslint-disable import/no-unresolved */
import {
  collectionValueOpacityType,
  UpdateValuePayloadType,
} from 'stores/collection/collectionValueOpacity';
/* eslint-enable import/no-unresolved */
import Icon from '../../atoms/Icon';

type Props = {
  storeUpdateOpacityValue: (payload: UpdateValuePayloadType) => void;
  storedOpacityValue: collectionValueOpacityType | collectionValueOpacityType[];
  isShowInputArea?: boolean;
  isShowBeforeIcon?: boolean;
  sliderStopCheckTime?: number;
  sliderMaxWidth?: number;
};

/**
 * material uiのカスタムスタイル
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
const OpacitySlider: React.FC<Props> = (props) => {
  const classes = useStyles();
  const {
    storeUpdateOpacityValue,
    isShowInputArea = true,
    isShowBeforeIcon = true,
    sliderStopCheckTime = 200,
    sliderMaxWidth = 500,
    storedOpacityValue,
  } = props;

  const styles = {
    sliderMaxWidth: css`
      max-width: ${sliderMaxWidth}px;
    `,
  };

  /**
   * storedOpacityValueのデータからidのデータのみを抽出したデータ
   */
  const targetOpacityValueId:
    | collectionValueOpacityType['id']
    | collectionValueOpacityType['id'][] = (() => {
    if (Array.isArray(storedOpacityValue)) {
      return storedOpacityValue.map(
        (singleStoredOpacityValue) => singleStoredOpacityValue.id
      );
    }
    return storedOpacityValue.id;
  })();

  /**
   * デフォルトのカラーをグローバルのstateから取得する
   */
  const defaultOpacityValue = (): number => {
    if (Array.isArray(storedOpacityValue) && storedOpacityValue.length > 0) {
      return storedOpacityValue[0].value * 100;
    }
    if (
      !Array.isArray(storedOpacityValue) &&
      typeof storedOpacityValue.value === 'number' &&
      !Number.isNaN(storedOpacityValue.value)
    ) {
      return storedOpacityValue.value * 100;
    }
    return 100;
  };
  const [opacityState, setOpacityState] = useState(defaultOpacityValue);
  // const [tempOnChangeState] = useState(false);
  // const [tempOnChangeCommitState] = useState(false);

  /**
   * 透過度が確定した際にdispatchを実行する
   * @param event
   * @param value 透過度の値
   * @todo 配列データが入ってきた際の対応(opacityが複数のパターンがある場合)
   */
  const handleChangeCommitted = () => {
    if (storeUpdateOpacityValue != null) {
      storeUpdateOpacityValue({
        targetId: targetOpacityValueId,
        targetIdNewValue: opacityState * 0.01,
      });
    }
  };

  const handleChangeCommittedDebounced = (nextValue: number) => {
    if (storeUpdateOpacityValue != null) {
      storeUpdateOpacityValue({
        targetId: targetOpacityValueId,
        targetIdNewValue: nextValue * 0.01,
      });
    }
  };

  const debouncedHandleChangeCommitted = useCallback(
    debounce(
      (nextValue: number) => handleChangeCommittedDebounced(nextValue),
      sliderStopCheckTime
    ),
    []
  );

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
    if (!Array.isArray(eventValue)) {
      debouncedHandleChangeCommitted(eventValue);
    }
  };

  /**
   * 透過度スライダーの脇の文字列入力inputを変更した際のイベント
   * @param event
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacityState(event.target.value === '' ? 0 : Number(event.target.value));
    if (storeUpdateOpacityValue != null && event.target.value !== '') {
      storeUpdateOpacityValue({
        targetId: targetOpacityValueId,
        targetIdNewValue: Number(event.target.value) * 0.01,
      });
    }
  };

  /**
   * input変更時のブラーイベント
   */
  const handleBlur = () => {
    if (!Array.isArray(storedOpacityValue)) {
      if (storedOpacityValue.value < 0) {
        if (storeUpdateOpacityValue != null) {
          storeUpdateOpacityValue({
            targetId: targetOpacityValueId,
            targetIdNewValue: 0.0,
          });
        }
      } else if (storedOpacityValue.value > 100) {
        if (storeUpdateOpacityValue != null) {
          storeUpdateOpacityValue({
            targetId: targetOpacityValueId,
            targetIdNewValue: 1.0,
          });
        }
      }
    }
  };

  return (
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
  );
};

OpacitySlider.defaultProps = {
  isShowInputArea: true,
  isShowBeforeIcon: true,
  sliderStopCheckTime: 200,
  sliderMaxWidth: 500,
};

export default OpacitySlider;
