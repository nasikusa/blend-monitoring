/* eslint no-nested-ternary: 0 */
import React, { useState, useCallback } from 'react';
import Draggable from 'react-draggable';
import { useDropzone } from 'react-dropzone';
import { css } from '@emotion/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';

/* eslint-disable import/no-unresolved */
import getResiedImageData from 'utils/image/getResizedImageData';
import { GlCollectionTypeArray } from 'types/collection/collectionData';
import MediaModalContentsContainer from 'containers/MediaModalContentsContainer';
import createStoredMediaItemObject from 'utils/image/createStoredMediaItemObject';
import { StoredMediaStateType } from 'stores/image/storedMedia';
/* eslint-enable import/no-unresolved */
import CustomAlert from '../../atoms/CustomAlert';

export type Props = {
  collectionData: GlCollectionTypeArray;
  storedMediaData: StoredMediaStateType;
  modalOpen: boolean;
  setModalOpen: (modalOpenFlag: boolean) => void;
  addMediaData: any;
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
  transition: background-color 0.1s ease;
`;

const DraggablePaperComponent = (paperProps: any) => {
  return (
    <Draggable
      handle="#blend-draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...paperProps} />
    </Draggable>
  );
};

/**
 * 描画モードのモーダルを管理するコンポーネント。モーダルの中身に関しては、
 * 他コンポーネントを参照してください。
 * @todo モーダル背景の透過度を調整できるようにしたい
 * @todo モーダルバツボタンがタッチデバイスで対応できてない(なぜ？)
 */
const ColorModal: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { modalOpen, setModalOpen, addMediaData } = props;
  const [onDropSnackBarOpenFlag, setOnDropSnackBarOpenFlag] = useState(false);
  const [
    onLoadMediaSnackBarOpenFlag,
    setOnLoadMediaSnackBarOpenFlag,
  ] = useState<boolean>(false);
  const [onErrorSnackBarOpenFlag, setOnErrorSnackBarOpenFlag] = useState(false);
  const [isBoxSmallFlag, setIsBoxSmallFlag] = useState(false);
  const [isImageBigFlag, setIsImageBigFlag] = useState(false);
  const [transparentBackgroundFlag] = useState(true);

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
            const fileNameValue = acceptedFiles[i].name;
            const resultStoredMediaItemObject = createStoredMediaItemObject({
              ...resultItem,
              fileNameValue,
            });
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
    accept: 'image/*',
  });

  /**
   * モーダルの開閉stateをfalseにする関数
   */
  const handleClose = (): void => {
    setModalOpen(!modalOpen);
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
      label: 'カラーを大きく',
    },
  ];

  return (
    <>
      <Dialog
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="描画モードパネル"
        open={modalOpen}
        maxWidth={false}
        disableEnforceFocus
        BackdropProps={{
          style: transparentBackgroundFlag
            ? { backgroundColor: 'rgba(0,0,0,0)', pointerEvents: 'all' }
            : {},
        }}
        PaperProps={{
          style: {
            pointerEvents: 'all',
            border: isDragActive
              ? '3px dashed #ffffff'
              : '0px solid transparent',
          },
        }}
        PaperComponent={DraggablePaperComponent}
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
            <Button onClick={handleClose}>閉じる</Button>
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
                    key={singleSwitchParam.name}
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
        <CustomAlert onClose={handleDropSnackBarClose} severity="info">
          画像を読み込んでいます。しばらくお待ちください。
        </CustomAlert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={onLoadMediaSnackBarOpenFlag}
        onClose={handleMediaLoadSnackBarClose}
      >
        <CustomAlert onClose={handleMediaLoadSnackBarClose} severity="success">
          画像の読み込みが完了しました。
        </CustomAlert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        open={onErrorSnackBarOpenFlag}
        autoHideDuration={12000}
        onClose={handleErrorSnackBarClose}
      >
        <CustomAlert onClose={handleErrorSnackBarClose} severity="error">
          画像の読み込み中にエラーが発生しました。
        </CustomAlert>
      </Snackbar>
    </>
  );
};

export default ColorModal;
