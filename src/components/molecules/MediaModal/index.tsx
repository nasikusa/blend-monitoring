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
  position: relative;
  border: 3px solid transparent;
`;

const modalTitleStyle = css`
  .MuiTypography-root {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.1s ease;
  :hover {
    background-color: rgba(255, 255, 255, 0.05);
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
  const [onDropSnackBarOpenFlag, setOnDropSnackBarOpenFlag] = useState(false);
  const [
    onLoadMediaSnackBarOpenFlag,
    setOnLoadMediaSnackBarOpenFlag,
  ] = useState(false);
  const [onErrorSnackBarOpenFlag, setOnErrorSnackBarOpenFlag] = useState(false);
  const [isBoxSmallFlag, setIsBoxSmallFlag] = useState(false);
  const [isImageBigFlag, setIsImageBigFlag] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setOnDropSnackBarOpenFlag(true);
    setOnLoadMediaSnackBarOpenFlag(false);
    setOnErrorSnackBarOpenFlag(false);
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
        })
        .catch(() => {
          setOnErrorSnackBarOpenFlag(true);
        })
        .finally(() => {
          setOnDropSnackBarOpenFlag(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    noClick: true,
  });

  /**
   * モーダルの開閉stateをfalseにする関数
   */
  const handleClose = (): void => {
    setModalOpen(false);
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

  const handleBoxSizeFlag = () => {
    setIsBoxSmallFlag(!isBoxSmallFlag);
  };

  const handleImageSizeFlag = () => {
    setIsImageBigFlag(!isImageBigFlag);
  };

  /**
   * モーダルのスイッチコンポーネントの情報をまとめた配列
   */
  const modalSwitchParams = [
    {
      name: 'panelSmall',
      onChange: handleBoxSizeFlag,
      checked: isBoxSmallFlag,
      label: 'パネルサイズを小さく',
    },
    {
      name: 'imageSmall',
      onChange: handleImageSizeFlag,
      checked: isImageBigFlag,
      label: '画像を大きく',
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
          style: {
            backgroundColor: 'rgba(0,0,0,0.5)',
            pointerEvents: 'all',
            border: isDragActive
              ? '3px dashed #ffffff'
              : '0px solid transparent',
          },
        }}
        PaperComponent={PaperComponent}
        css={modalBackStyle}
      >
        <div {...getRootProps()}>
          <input {...getInputProps()} />
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
            <MediaModalContentsContainer
              OpenFileWindowFunction={open}
              isBoxSmallFlag={isBoxSmallFlag}
              isImageBigFlag={isImageBigFlag}
            />
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
