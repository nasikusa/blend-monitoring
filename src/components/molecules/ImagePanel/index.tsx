import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Icon from '../../atoms/Icon';
import MediaModalContainer from '../../../container/MediaModalContainer';
import { StoredMediaStateType } from '../../../stores/storedMedia';
import { ImageRelatedGlCollectionType } from '../../../stores/collectionData';

export type Props = {
  storedMediaData: StoredMediaStateType;
  globalStateImageData: Pick<ImageRelatedGlCollectionType, 'image'>['image'];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    label: {
      fontSize: '12px',
    },
    imageListRoot: {
      width: '100%',
    },
  })
);

const ImagePanel: React.FC<Props> = (props: Props) => {
  const classes = useStyles();
  const { storedMediaData, globalStateImageData } = props;
  const [imagePanelOpen, setImagePanelOpen] = useState(true);
  const [imageBoxWidth] = useState<number>(250);
  const [imageBoxRowCount] = useState<number>(4);

  /**
   * カラーピッカーパネルの開閉フラグ用の関数
   */
  const handleOpen = (): void => {
    setImagePanelOpen(!imagePanelOpen);
  };

  return (
    <Box width={1}>
      <Typography gutterBottom className={classes.label}>
        画像
      </Typography>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box display="flex" mb={1}>
            <Icon type="imagePanel" />
            <Box ml={2} width={imageBoxWidth}>
              <GridList
                cellHeight={imageBoxWidth / imageBoxRowCount}
                cols={imageBoxRowCount}
              >
                {globalStateImageData != null &&
                globalStateImageData.length !== 0 &&
                Array.isArray(globalStateImageData)
                  ? globalStateImageData.map((singleImageID: string) => {
                      return (
                        <GridListTile key={singleImageID} cols={1}>
                          <img
                            src={storedMediaData[singleImageID].resource.small}
                            alt="sample"
                          />
                        </GridListTile>
                      );
                    })
                  : ''}
              </GridList>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box ml={4}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleOpen}
              style={{ maxHeight: '25px' }}
            >
              画像パネルを開く
            </Button>
          </Box>
        </Grid>
      </Grid>
      <MediaModalContainer
        modalOpen={imagePanelOpen}
        setModalOpen={setImagePanelOpen}
      />
    </Box>
  );
};

export default ImagePanel;
