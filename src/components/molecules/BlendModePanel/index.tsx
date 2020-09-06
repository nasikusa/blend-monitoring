import React, { useState, useContext } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';

import Icon from '../../atoms/Icon';
import { readyBlendModeData } from '../../../utils/blendMode/getBlendModeData';
import {
  GlCollectionOrderContext,
  GlCollectionOrderContextType,
} from '../Collections';
import BlendModalContainer from '../../../container/BlendModalContainer';

import { GlCollectionTypeArray } from '../../../types/collection/collectionData';

type Props = {
  collectionData: GlCollectionTypeArray;
  updateBlendMode: any;
  blendModeOrder: string[];
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

const BlendModePanel = (props: Props) => {
  const { collectionData, updateBlendMode, blendModeOrder } = props;
  const glCollectionOrderKey: GlCollectionOrderContextType = useContext(
    GlCollectionOrderContext
  );
  const globalBlendModeStateArray =
    collectionData[glCollectionOrderKey].blendMode;
  const classes = useStyles();
  const [open, setOpen] = useState(false);

  /**
   * モーダルの開閉stateをtrueにする関数
   */
  const handleOpen = (): void => {
    setOpen(true);
  };

  const getBlendModeNameMenuView = (() => {
    if (Array.isArray(globalBlendModeStateArray)) {
      return `複数の描画モード`;
    }
    const singleBlendModeData = readyBlendModeData[globalBlendModeStateArray];
    if (singleBlendModeData != null) {
      return singleBlendModeData.name.ja;
    }
    return '';
  })();

  /**
   * 描画モードチップのバツアイコンを押したときの関数
   * @param blendModeName 描画モード名(英語)
   */
  const handleChipClickClose = (blendModeName: string): void => {
    updateBlendMode({
      blendMode: blendModeName,
      boolValue: false,
      glCollectionOrderKey,
      blendModeOrder,
    });
  };

  return (
    <>
      <Box width={1}>
        <Typography gutterBottom className={classes.label}>
          描画モード
        </Typography>
        <Box mb={1}>
          <Grid container spacing={4} className={classes.grid}>
            <Grid item>
              <Icon type="blendModePanel" />
            </Grid>
            <Grid item>
              <Button
                size="small"
                variant="contained"
                color="primary"
                onClick={handleOpen}
              >
                {getBlendModeNameMenuView}
              </Button>
            </Grid>
          </Grid>
        </Box>
        <Box ml={4}>
          {Array.isArray(globalBlendModeStateArray) ? (
            <Grid container spacing={1}>
              {globalBlendModeStateArray.map((singleBlendModeData) => {
                const chipLabelName = (() => {
                  const singleBlendData =
                    readyBlendModeData[singleBlendModeData];
                  if (singleBlendData != null) {
                    return singleBlendData.name.ja;
                  }
                  return '';
                })();
                return (
                  <Grid item key={singleBlendModeData}>
                    <Chip
                      size="small"
                      onDelete={() => {
                        handleChipClickClose(singleBlendModeData);
                      }}
                      label={chipLabelName}
                    />
                  </Grid>
                );
              })}
            </Grid>
          ) : (
            ''
          )}
        </Box>
      </Box>
      <BlendModalContainer modalOpen={open} setModalOpen={setOpen} />
    </>
  );
};

export default BlendModePanel;
