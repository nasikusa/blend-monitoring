/* eslint no-nested-ternary: 0 */

import React, { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { css } from '@emotion/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import CloseIcon from '@material-ui/icons/Close';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

// import { GlCollectionOrderContext } from '../Collections';

import { GlCollectionInterfaceArray } from '../../../stores/collectionData';
import MediaModalContentsContainer from '../../../container/MediaModalContentsContainer';

type Props = {
  collectionData: GlCollectionInterfaceArray;
  storedMediaData: any;
  modalOpen: boolean;
  setModalOpen: any;
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
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.2s ease;
  :hover {
    background-color: rgba(255, 255, 255, 0.2);
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
   * モーダルのスイッチコンポーネントの情報をまとめた配列
   */
  const modalSwitchParams = [
    {
      name: 'transparent',
      onChange: handleSwitchChangeModalOpacity,
      checked: modalTransparentFlag,
      label: 'パネルを透過',
    },
    {
      name: 'small',
      onChange: handleSwitchChangeSize,
      checked: modalMinifyFlag,
      label: 'サイズを小さく',
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
          backgroundColor: modalTransparentFlag
            ? 'rgba(0,0,0,0)'
            : 'rgba(0,0,0,0.5)',
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
        画像の設定パネル
        <IconButton aria-label="close" onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <MediaModalContentsContainer />
      </DialogContent>
      <DialogActions>
        <FormGroup row>
          {modalSwitchParams.map((singleSwitchParam) => {
            return (
              <FormControlLabel
                control={
                  <Switch
                    size="small"
                    checked={singleSwitchParam.checked}
                    onChange={singleSwitchParam.onChange}
                    name={singleSwitchParam.name}
                  />
                }
                label={singleSwitchParam.label}
              />
            );
          })}
        </FormGroup>
      </DialogActions>
    </Dialog>
  );
};
