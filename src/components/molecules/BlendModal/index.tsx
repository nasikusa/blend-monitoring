import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Button from '@material-ui/core/Button';

import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import {isSingleTrueStateObject,getTrueStateBlendNameArray} from '../../../utils/GetBlendModeData';
import BlendModalContentsContainer from '../../../container/BlendModalContentsContainer';

type Props = {
  itemKey: number;
}

const useStyles = makeStyles((theme: Theme) =>
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
    }
  }),
);

export default ( props: any ) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const {itemKey,collectionData} = props;
  const collectionDataState = collectionData;
  const boolBlendModeStateObject = collectionDataState[itemKey].blendMode;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
            <Button variant="contained" color="primary" onClick={handleOpen} style={{maxHeight: '25px'}}>
                { isSingleTrueStateObject(boolBlendModeStateObject) ? getTrueStateBlendNameArray(boolBlendModeStateObject)[0] : `複数の描画モード` }
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
                <BlendModalContentsContainer itemKey={itemKey} />
            </Fade>
        </Modal>
    </Box>
  );
}