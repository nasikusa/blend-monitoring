/* eslint no-nested-ternary: 0 */

import React, { useState, useCallback } from 'react';
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
import { useDropzone } from 'react-dropzone';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

import getResiedImageData from '../../../utils/getResizedImageData';
import { GlCollectionTypeArray } from '../../../stores/collectionData';
import MediaModalContentsContainer from '../../../container/MediaModalContentsContainer';
import createStoredMediaItemObject from '../../../utils/createStoredMediaItemObject';

import { StoredMediaStateType } from '../../../stores/storedMedia';

type Props = {
  collectionData: GlCollectionTypeArray;
  storedMediaData: StoredMediaStateType;
  modalOpen: boolean;
  setModalOpen: any;
  addMediaData: any;
};

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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
  const { modalOpen, setModalOpen, addMediaData } = props;
  const [modalMinifyFlag, setModalMinifyFlag] = useState(false);
  const [modalImageMinifyFlag, setModalImageMinifyFlag] = useState(false);
  const [onDropSnackBarOpenFlag, setOnDropSnackBarOpenFlag] = useState(false);
  const [
    onLoadMediaSnackBarOpenFlag,
    setOnLoadMediaSnackBarOpenFlag,
  ] = useState(false);
  const [onErrorSnackBarOpenFlag, setOnErrorSnackBarOpenFlag] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setOnDropSnackBarOpenFlag(true);
    setOnLoadMediaSnackBarOpenFlag(false);
    setOnErrorSnackBarOpenFlag(false);
    console.log(acceptedFiles);
    if (acceptedFiles != null) {
      getResiedImageData(acceptedFiles)
        .then((result) => {
          setOnLoadMediaSnackBarOpenFlag(true);
          for (let i = 0; i < result.length; i += 1) {
            const resultItem = result[i];
            const resultStoredMediaItemObject = createStoredMediaItemObject(
              resultItem
            );
            addMediaData({
              newMediaDataObject: resultStoredMediaItemObject,
            });
          }
          console.log(result);
        })
        .catch(() => {
          setOnErrorSnackBarOpenFlag(true);
        })
        .finally(() => {
          setOnDropSnackBarOpenFlag(false);
        });
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
  });

  /**
   * モーダルの開閉stateをfalseにする関数
   */
  const handleClose = (): void => {
    setModalOpen(false);
  };

  /**
   * モーダルサイズハンドル関数
   */
  const handleSwitchChangePanelSize = (): void => {
    setModalMinifyFlag(!modalMinifyFlag);
  };
  /**
   * モーダル画像サイズハンドル関数
   */
  const handleSwitchChangeImageSize = (): void => {
    setModalImageMinifyFlag(!modalImageMinifyFlag);
  };

  const handleDropSnackBarClose = (): void => {
    setOnDropSnackBarOpenFlag(false);
  };
  const handleMediaLoadSnackBarClose = (): void => {
    setOnLoadMediaSnackBarOpenFlag(false);
  };
  const handleErrorSnackBarClose = (): void => {
    setOnErrorSnackBarOpenFlag(false);
  };

  /**
   * モーダルのスイッチコンポーネントの情報をまとめた配列
   */
  const modalSwitchParams = [
    {
      name: 'panelSmall',
      onChange: handleSwitchChangePanelSize,
      checked: modalMinifyFlag,
      label: 'パネルサイズを小さく',
    },
    {
      name: 'imageSmall',
      onChange: handleSwitchChangeImageSize,
      checked: modalImageMinifyFlag,
      label: '画像を小さく',
    },
  ];

  return (
    <>
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
          style: { backgroundColor: 'rgba(0,0,0,0.5)', pointerEvents: 'all' },
        }}
        PaperComponent={PaperComponent}
        css={modalMinifyFlag ? modalMinifyStyle : modalBackStyle}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>Drag n drop some files here, or click to select files</p>
          )}
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
        </div>
      </Dialog>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={onDropSnackBarOpenFlag}
        autoHideDuration={12000}
        onClose={handleDropSnackBarClose}
      >
        <Alert onClose={handleDropSnackBarClose} severity="info">
          画像を読み込んでいます。しばらくお待ちください。
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={onLoadMediaSnackBarOpenFlag}
        autoHideDuration={12000}
        onClose={handleMediaLoadSnackBarClose}
      >
        <Alert onClose={handleMediaLoadSnackBarClose} severity="success">
          画像の読み込みが完了しました。
        </Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={onErrorSnackBarOpenFlag}
        autoHideDuration={12000}
        onClose={handleErrorSnackBarClose}
      >
        <Alert onClose={handleErrorSnackBarClose} severity="error">
          画像の読み込み中にエラーが発生しました。
        </Alert>
      </Snackbar>
    </>
  );
};
