/* eslint no-nested-ternary: 0 */
import React, { useState, useCallback, Dispatch, SetStateAction } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { css, SerializedStyles } from '@emotion/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';

/* eslint-disable import/no-unresolved */
import BlendModalSettingsContext from 'contexts/BlendModalSettingsContext';
import useRawCollection from 'hooks/collection/useRawCollection';
import BlendModalContentsContainer from 'containers/BlendModalContentsContainer';
import ModalOpenContext from 'contexts/ModalOpenContext';
import CustomIconButton from '../CustomIconButton';
import { IconTypeTypes } from '../../atoms/Icon';
/* eslint-enable import/no-unresolved */

export type Props = {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
};

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
    },
  })
);

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#blend-draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

/**
 * モーダルの背景要素をタッチ不能にして、モーダルの下の要素のクリックを可能にするためのCSS
 */
const modalBackStyle = css`
  pointer-events: none;
`;

const modalTitleStyle = css`
  .MuiTypography-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

/**
 * モーダルを小さいサイズにするスタイル
 * @todo かなり強制的に塗り替えてしまっているので、他の方法でできるならそれが良いと思う
 */
const modalMinifyStyle = css`
  ${modalBackStyle}
  .MuiDialogTitle-root {
    padding: 4px 10px;
  }
  .MuiDialogContent-root {
    padding: 0px;
  }
  .MuiDialogContent-root .MuiFormControlLabel-root {
    width: 130px !important;
    padding-left: 0px !important;
  }
  .MuiFormControlLabel-root .MuiTypography-root {
    font-size: 12px !important;
  }
  .MuiFormLabel-root {
    padding-bottom: 0px !important;
  }
  .MuiDialogActions-root {
    padding: 0px;
  }
`;

/**
 * 描画モードのモーダルを管理するコンポーネント。モーダルの中身に関しては、
 * 他コンポーネントを参照してください。
 * @todo モーダル背景の透過度を調整できるようにしたい
 * @todo モーダルバツボタンがタッチデバイスで対応できてない(なぜ？)
 */
const BlendModal: React.FC<Props> = (props) => {
  const classes = useStyles();
  const rawCollectionDataContextValue = useRawCollection();
  const { modalOpen, setModalOpen } = props;
  const [modalTransparentFlag, setModalTransparentFlag] = useState(false);
  const [modalMinifyFlag, setModalMinifyFlag] = useState(false);
  const [canDisplayNormalBlend, setCanDisplayNormalBlend] = useState(true);
  const [canDisplayLighterBlend, setCanDisplayLighterBlend] = useState(true);
  const [
    canDisplayLighterAndDarkerBlend,
    setCanDisplayLighterAndDarkerBlend,
  ] = useState(true);
  const [canDisplayDarkerBlend, setCanDisplayDarkerBlend] = useState(true);
  const [canDisplayMathBlend, setCanDisplayMathBlend] = useState(true);
  const blendModeSwitchBoolArray = [
    canDisplayNormalBlend,
    canDisplayLighterBlend,
    canDisplayLighterAndDarkerBlend,
    canDisplayDarkerBlend,
    canDisplayMathBlend,
  ];

  /**
   * 描画モードの表示のオンオフスイッチの有効数
   */
  const blendModeSwitchActiveCount: number = blendModeSwitchBoolArray.filter(
    (val) => val === true
  ).length;

  let modalMaxWidthStyle: SerializedStyles = css``;
  if (modalMinifyFlag) {
    if (blendModeSwitchActiveCount === 2) {
      modalMaxWidthStyle = css`
        max-width: 280px;
      `;
    }
    if (blendModeSwitchActiveCount <= 1) {
      modalMaxWidthStyle = css`
        max-width: 140px;
      `;
    }
  } else {
    if (blendModeSwitchActiveCount === 2) {
      modalMaxWidthStyle = css`
        max-width: 380px;
      `;
    }
    if (blendModeSwitchActiveCount <= 1) {
      modalMaxWidthStyle = css`
        max-width: 220px;
      `;
    }
  }

  /**
   * モーダルの開閉stateをfalseにする関数
   */
  const handleClose = (): void => {
    setModalOpen(false);
  };

  /**
   * モーダル透過ハンドル関数
   */
  const handleSwitchChangeModalOpacity = (): void => {
    setModalTransparentFlag(!modalTransparentFlag);
  };
  /**
   * モーダルサイズハンドル関数
   */
  const handleSwitchChangeSize = useCallback((): void => {
    setModalMinifyFlag(!modalMinifyFlag);
  }, [modalMinifyFlag]);

  /**
   * ctrlキーと同時に押した際に、他のものを除外した描画モードの表示を選択をする関数
   * @param targetBlendModeName ターゲットとなる対象を識別するための文字列
   * @todo もう少しスマートにできるかも？
   */
  const handleExcludeSwitchBlend = useCallback(
    (targetBlendModeName: 'normal' | '+' | '+-' | '-' | 'math'): void => {
      switch (targetBlendModeName) {
        case 'normal':
          setCanDisplayNormalBlend(true);
          setCanDisplayDarkerBlend(false);
          setCanDisplayLighterAndDarkerBlend(false);
          setCanDisplayLighterBlend(false);
          setCanDisplayMathBlend(false);
          break;
        case '-':
          setCanDisplayNormalBlend(false);
          setCanDisplayDarkerBlend(true);
          setCanDisplayLighterAndDarkerBlend(false);
          setCanDisplayLighterBlend(false);
          setCanDisplayMathBlend(false);
          break;
        case '+-':
          setCanDisplayNormalBlend(false);
          setCanDisplayDarkerBlend(false);
          setCanDisplayLighterAndDarkerBlend(true);
          setCanDisplayLighterBlend(false);
          setCanDisplayMathBlend(false);
          break;
        case '+':
          setCanDisplayNormalBlend(false);
          setCanDisplayDarkerBlend(false);
          setCanDisplayLighterAndDarkerBlend(false);
          setCanDisplayLighterBlend(true);
          setCanDisplayMathBlend(false);
          break;
        case 'math':
          setCanDisplayNormalBlend(false);
          setCanDisplayDarkerBlend(false);
          setCanDisplayLighterAndDarkerBlend(false);
          setCanDisplayLighterBlend(false);
          setCanDisplayMathBlend(true);
          break;
        default:
          break;
      }
    },
    []
  );

  /**
   * 通常描画モードハンドル関数
   */
  const handleSwitchChangeNormalBlend = useCallback(
    (event: React.MouseEvent): void => {
      if (event.ctrlKey) {
        handleExcludeSwitchBlend('normal');
      } else {
        setCanDisplayNormalBlend(!canDisplayNormalBlend);
      }
    },
    [handleExcludeSwitchBlend, canDisplayNormalBlend]
  );
  /**
   * 明るい描画モードハンドル関数
   */
  const handleSwitchChangeLighterBlend = useCallback(
    (event: React.MouseEvent): void => {
      if (event.ctrlKey) {
        handleExcludeSwitchBlend('+');
      } else {
        setCanDisplayLighterBlend(!canDisplayLighterBlend);
      }
    },
    [handleExcludeSwitchBlend, canDisplayLighterBlend]
  );
  /**
   * 明暗描画モードハンドル関数
   */
  const handleSwitchChangeLighterAndDarkerBlend = useCallback(
    (event: React.MouseEvent): void => {
      if (event.ctrlKey) {
        handleExcludeSwitchBlend('+-');
      } else {
        setCanDisplayLighterAndDarkerBlend(!canDisplayLighterAndDarkerBlend);
      }
    },
    [handleExcludeSwitchBlend, canDisplayLighterAndDarkerBlend]
  );
  /**
   * 暗くなる描画モードハンドル関数
   */
  const handleSwitchChangeDarkerBlend = useCallback(
    (event: React.MouseEvent): void => {
      if (event.ctrlKey) {
        handleExcludeSwitchBlend('-');
      } else {
        setCanDisplayDarkerBlend(!canDisplayDarkerBlend);
      }
    },
    [handleExcludeSwitchBlend, canDisplayDarkerBlend]
  );
  /**
   * 数学描画モードハンドル関数
   */
  const handleSwitchChangeMathBlend = useCallback(
    (event: React.MouseEvent): void => {
      if (event.ctrlKey) {
        handleExcludeSwitchBlend('math');
      } else {
        setCanDisplayMathBlend(!canDisplayMathBlend);
      }
    },
    [handleExcludeSwitchBlend, canDisplayMathBlend]
  );

  type modalFunctionsType = {
    name: string;
    type: IconTypeTypes;
    onChange: any;
    checked: boolean;
    label: string;
  };

  /**
   * モーダルのスイッチコンポーネントの情報をまとめた配列
   */
  const modalSwitchParams: modalFunctionsType[] = [
    {
      name: 'transparent',
      type: 'functionOpacity',
      onChange: handleSwitchChangeModalOpacity,
      checked: modalTransparentFlag,
      label: 'パネルを透過',
    },
    {
      name: 'small',
      type: 'functionZoomOut',
      onChange: handleSwitchChangeSize,
      checked: modalMinifyFlag,
      label: 'パネルサイズを小さく',
    },
    {
      name: 'normal',
      type: 'blendModeNormal',
      onChange: handleSwitchChangeNormalBlend,
      checked: canDisplayNormalBlend,
      label: '通常の描画モードを非表示',
    },
    {
      name: 'darker',
      type: 'blendModeBrightnessMinus',
      onChange: handleSwitchChangeDarkerBlend,
      checked: canDisplayDarkerBlend,
      label: '暗くなる描画モードを非表示',
    },
    {
      name: 'lighterAndDarker',
      type: 'blendModeBrightnessPlusMinus',
      onChange: handleSwitchChangeLighterAndDarkerBlend,
      checked: canDisplayLighterAndDarkerBlend,
      label: '明暗を強化する描画モードを非表示',
    },
    {
      name: 'lighter',
      type: 'blendModeBrightnessPlus',
      onChange: handleSwitchChangeLighterBlend,
      checked: canDisplayLighterBlend,
      label: '明るくなる描画モードを非表示',
    },
    {
      name: 'math',
      type: 'blendModeMath',
      onChange: handleSwitchChangeMathBlend,
      checked: canDisplayMathBlend,
      label: 'その他の描画モードを非表示',
    },
  ];

  return (
    <ModalOpenContext.Provider
      value={{ isModalOpen: modalOpen, setIsModalOpen: setModalOpen }}
    >
      <BlendModalSettingsContext.Provider
        value={{
          setModalTransparentFlag,
          setModalMinifyFlag,
          setCanDisplayNormalBlend,
          setCanDisplayLighterBlend,
          setCanDisplayLighterAndDarkerBlend,
          setCanDisplayDarkerBlend,
          setCanDisplayMathBlend,
          modalTransparentFlag,
          modalMinifyFlag,
          canDisplayNormalBlend,
          canDisplayLighterBlend,
          canDisplayLighterAndDarkerBlend,
          canDisplayDarkerBlend,
          canDisplayMathBlend,
        }}
      >
        <Dialog
          className={classes.modal}
          onClose={handleClose}
          aria-labelledby="描画モードのパネル"
          open={modalOpen}
          maxWidth={false}
          disableEnforceFocus
          BackdropProps={{
            style: { backgroundColor: 'rgba(0,0,0,0)', pointerEvents: 'none' },
          }}
          PaperProps={{
            style: {
              backgroundColor: modalTransparentFlag ? 'rgba(0,0,0,0)' : '',
              pointerEvents: 'all',
            },
          }}
          PaperComponent={PaperComponent}
          css={modalMinifyFlag ? modalMinifyStyle : modalBackStyle}
        >
          <DialogTitle
            id="blend-draggable-dialog-title"
            style={{ cursor: 'move' }}
            css={modalTitleStyle}
          >
            {blendModeSwitchActiveCount <= 1
              ? '描画モード'
              : '描画モードの設定パネル'}
            <Button onClick={handleClose}>閉じる</Button>
          </DialogTitle>
          <DialogContent dividers>
            <BlendModalContentsContainer
              blendModalMode={
                (Array.isArray(rawCollectionDataContextValue.innerItemId) &&
                  rawCollectionDataContextValue.type ===
                    'singleColorMultiBlends') ||
                rawCollectionDataContextValue.type === 'singleImageMultiBlends'
                  ? 'multi'
                  : 'single'
              }
            />
          </DialogContent>
          <DialogActions>
            <FormGroup row css={modalMaxWidthStyle}>
              {modalSwitchParams.map((singleSwitchParam) => {
                return (
                  <CustomIconButton
                    key={singleSwitchParam.type}
                    type={singleSwitchParam.type}
                    active={singleSwitchParam.checked}
                    onClick={singleSwitchParam.onChange}
                    labelTitle={singleSwitchParam.label}
                  />
                );
              })}
            </FormGroup>
          </DialogActions>
        </Dialog>
      </BlendModalSettingsContext.Provider>
    </ModalOpenContext.Provider>
  );
};

export default BlendModal;
