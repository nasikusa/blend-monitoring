import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import Icon from '../../atoms/Icon';
import MediaModalContainer from '../../../container/MediaModalContainer';
import { StoredMediaStateType } from '../../../stores/image/storedMedia';
import { collectionValueImageType } from '../../../stores/collection/collectionValueImage';

export type Props = {
  storedMediaData: StoredMediaStateType;
  storedImageValue: collectionValueImageType | collectionValueImageType[];
};

const ImagePanel: React.FC<Props> = (props: Props) => {
  const { storedMediaData, storedImageValue } = props;
  const [imagePanelOpen, setImagePanelOpen] = useState(false);
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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Box display="flex" mb={1}>
            <Icon type="imagePanel" />
            <Box ml={2} width={imageBoxWidth}>
              <GridList
                cellHeight={imageBoxWidth / imageBoxRowCount}
                cols={imageBoxRowCount}
              >
                {storedImageValue != null && Array.isArray(storedImageValue) ? (
                  storedImageValue.map(
                    (singleImageValue: collectionValueImageType) => {
                      return (
                        <GridListTile key={singleImageValue.value} cols={1}>
                          <img
                            src={
                              storedMediaData[singleImageValue.value].resource
                                .small
                            }
                            alt="thumbnailImage"
                          />
                        </GridListTile>
                      );
                    }
                  )
                ) : (
                  <GridListTile key={storedImageValue.value} cols={1}>
                    <img
                      src={
                        storedMediaData[storedImageValue.value].resource.small
                      }
                      alt="thumbnailImage"
                    />
                  </GridListTile>
                )}
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
