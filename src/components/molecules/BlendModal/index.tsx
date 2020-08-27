/* eslint no-nested-ternary: 0 */
import React, { useContext, useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { css, SerializedStyles } from '@emotion/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import FormGroup from '@material-ui/core/FormGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button';

import CustomIconButton from '../CustomIconButton';

import {
  GlCollectionOrderContext,
  GlCollectionOrderContextType,
} from '../Collections';
import { IconTypeTypes } from '../../atoms/Icon';
import BlendModalContentsContainer from '../../../container/BlendModalContentsContainer';

type Props = {
  modalOpen: boolean;
  setModalOpen: (modalOpenFlag: boolean) => void;
};

const useStyles = makeStyles(() =>
  createStyles({
    label: {
      fontSize: `12px`,
    },
    modal: {
      display: `flex`,
      alignItems: `center`,
      justifyContent: `center`,
    },
    grid: {
      // display: `flex`,
      // alignItems: `center`,
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
export default (props: Props) => {
  const classes = useStyles();
  const { modalOpen, setModalOpen } = props;
  const [modalTransparentFlag, setModalTransparentFlag] = useState(false);
  const [modalMinifyFlag, setModalMinifyFlag] = useState(false);
  const [canDisplayNormalBlend, setCanDisplayNormalBlend] = useState(true);
  const [canDispalyLighterBlend, setCanDisplayLighterBlend] = useState(true);
  const [
    canDisplayLighterAndDarkerBlend,
    setCanDisplayLighterAndDarkerBlend,
  ] = useState(true);
  const [canDisplayDarkerBlend, setCanDisplayDarkerBlend] = useState(true);
  const [canDisplayMathBlend, setCanDisplayMathBlend] = useState(true);
  const glCollectionOrderKey: GlCollectionOrderContextType = useContext(
    GlCollectionOrderContext
  );
  const blendModeSwitchBoolArray = [
    canDisplayNormalBlend,
    canDispalyLighterBlend,
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
  const handleSwitchChangeSize = (): void => {
    setModalMinifyFlag(!modalMinifyFlag);
  };
  /**
   * 通常描画モードハンドル関数
   */
  const handleSwitchChangeNormalBlend = (): void => {
    setCanDisplayNormalBlend(!canDisplayNormalBlend);
  };
  /**
   * 明るい描画モードハンドル関数
   */
  const handleSwitchChangeLighterBlend = (): void => {
    setCanDisplayLighterBlend(!canDispalyLighterBlend);
  };
  /**
   * 明暗描画モードハンドル関数
   */
  const handleSwitchChangeLighterAndDarkerBlend = (): void => {
    setCanDisplayLighterAndDarkerBlend(!canDisplayLighterAndDarkerBlend);
  };
  /**
   * 暗くなる描画モードハンドル関数
   */
  const handleSwitchChangeDarkerBlend = (): void => {
    setCanDisplayDarkerBlend(!canDisplayDarkerBlend);
  };
  /**
   * 数学描画モードハンドル関数
   */
  const handleSwitchChangeMathBlend = (): void => {
    setCanDisplayMathBlend(!canDisplayMathBlend);
  };

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
      label: blendModeSwitchActiveCount <= 1 ? '透過' : 'パネルを透過',
    },
    {
      name: 'small',
      type: 'functionZoomOut',
      onChange: handleSwitchChangeSize,
      checked: modalMinifyFlag,
      label: blendModeSwitchActiveCount <= 1 ? '小' : 'サイズを小さく',
    },
    {
      name: 'normal',
      type: 'blendModeNormal',
      onChange: handleSwitchChangeNormalBlend,
      checked: canDisplayNormalBlend,
      label: '通常',
    },
    {
      name: 'darker',
      type: 'blendModeBrightnessMinus',
      onChange: handleSwitchChangeDarkerBlend,
      checked: canDisplayDarkerBlend,
      label: blendModeSwitchActiveCount <= 1 ? '暗' : '暗く',
    },
    {
      name: 'lighterAndDarker',
      type: 'blendModeBrightnessPlusMinus',
      onChange: handleSwitchChangeLighterAndDarkerBlend,
      checked: canDisplayLighterAndDarkerBlend,
      label: blendModeSwitchActiveCount <= 1 ? '明暗' : '明暗を強化',
    },
    {
      name: 'lighter',
      type: 'blendModeBrightnessPlus',
      onChange: handleSwitchChangeLighterBlend,
      checked: canDispalyLighterBlend,
      label: blendModeSwitchActiveCount <= 1 ? '明' : '明るく',
    },
    {
      name: 'math',
      type: 'blendModeMath',
      onChange: handleSwitchChangeMathBlend,
      checked: canDisplayMathBlend,
      label: blendModeSwitchActiveCount <= 1 ? '他' : 'その他',
    },
  ];

  return (
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
        {/* <IconButton size="small" aria-label="close" onClick={handleClose}>
          <Icon type="functionClose" fontSize="large" />
        </IconButton> */}
      </DialogTitle>
      <DialogContent dividers>
        <BlendModalContentsContainer
          glCollectionOrderKey={glCollectionOrderKey}
          canDisplayNormalBlend={canDisplayNormalBlend}
          canDispalyLighterBlend={canDispalyLighterBlend}
          canDisplayLighterAndDarkerBlend={canDisplayLighterAndDarkerBlend}
          canDisplayDarkerBlend={canDisplayDarkerBlend}
          canDisplayMathBlend={canDisplayMathBlend}
        />
      </DialogContent>
      <DialogActions>
        <FormGroup row css={modalMaxWidthStyle}>
          {modalSwitchParams.map((singleSwitchParam) => {
            return (
              <CustomIconButton
                type={singleSwitchParam.type}
                active={singleSwitchParam.checked}
                buttonGeneralProps={{
                  onClick: singleSwitchParam.onChange,
                }}
              />
              // <FormControlLabel
              //   control={
              //     <Switch
              //       size="small"
              //       checked={singleSwitchParam.checked}
              //       onChange={singleSwitchParam.onChange}
              //       name={singleSwitchParam.name}
              //     />
              //   }
              //   label={singleSwitchParam.label}
              // />
            );
          })}
        </FormGroup>
      </DialogActions>
    </Dialog>
  );
};
