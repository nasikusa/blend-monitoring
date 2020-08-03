import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { css } from '@emotion/core';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Paper, { PaperProps } from '@material-ui/core/Paper';
import Draggable from 'react-draggable';

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import CloseIcon from '@material-ui/icons/Close';
import { GlCollectionOrderContext } from '../Collections';
import BlendModalContentsContainer from '../../../container/BlendModalContentsContainer';
import { readyBlendModeData } from '../../../utils/GetBlendModeData';

import { GlCollectionInterfaceArray } from '../../../stores/collectionData';

type Props = {
  collectionData: GlCollectionInterfaceArray;
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
      display: `flex`,
      alignItems: `center`,
    },
  })
);

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} />
    </Draggable>
  );
}

const modalBackStyle = css`
  pointer-events: none;
`;

/**
 * 描画モードのモーダルを管理するコンポーネント。モーダルの中身に関しては、
 * 他コンポーネントを参照してください。
 * @todo モーダル背景の透過度を調整できるようにしたい
 */
export default (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const { collectionData } = props;
  const glCollectionOrderKey = useContext(GlCollectionOrderContext);
  const collectionDataState = collectionData;
  const boolBlendModeStateObject =
    collectionDataState[glCollectionOrderKey].blendMode;

  /**
   * モーダルの開閉stateをtrueにする関数
   */
  const handleOpen = (): void => {
    setOpen(true);
  };

  /**
   * モーダルの開閉stateをfalseにする関数
   */
  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <Box width={1}>
      <Typography gutterBottom className={classes.label}>
        描画モード
      </Typography>
      <Grid container spacing={4} className={classes.grid}>
        <Grid item>
          <PhotoLibraryIcon />
        </Grid>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpen}
          style={{ maxHeight: '25px' }}
        >
          {Array.isArray(boolBlendModeStateObject)
            ? `複数の描画モード`
            : readyBlendModeData[boolBlendModeStateObject].name.ja}
        </Button>
      </Grid>
      <Dialog
        className={classes.modal}
        onClose={handleClose}
        aria-labelledby="dialog-title"
        open={open}
        maxWidth="lg"
        fullWidth
        BackdropProps={{
          style: { backgroundColor: 'rgba(0,0,0,0)', pointerEvents: 'none' },
        }}
        PaperProps={{
          style: { backgroundColor: 'rgba(0,0,0,0.5)', pointerEvents: 'all' },
        }}
        PaperComponent={PaperComponent}
        css={modalBackStyle}
      >
        <DialogTitle id="draggable-dialog-title" style={{ cursor: 'move' }}>
          描画モードの設定パネル
          <IconButton aria-label="close" onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          <BlendModalContentsContainer
            glCollectionOrderKey={glCollectionOrderKey}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            パネルを閉じる
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};
