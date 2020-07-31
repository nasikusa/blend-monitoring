import React, { useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import { GlCollectionOrderContext } from '../Collections';
import BlendModalContentsContainer from '../../../container/BlendModalContentsContainer';

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

/**
 * 描画モードのモーダルを管理するコンポーネント。モーダルの中身に関しては、
 * 他コンポーネントを参照してください。
 */
export default (props: Props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
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
            : boolBlendModeStateObject}
        </Button>
      </Grid>
      <Modal
        aria-labelledby="blendModeModal"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          invisible: true,
        }}
      >
        <Fade in={open}>
          <BlendModalContentsContainer
            glCollectionOrderKey={glCollectionOrderKey}
          />
        </Fade>
      </Modal>
    </Box>
  );
};
