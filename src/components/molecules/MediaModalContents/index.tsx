import React, { useState, useEffect } from 'react';
import { css } from '@emotion/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';
import Icon from '../../atoms/Icon';

import getGlViewItemAspect from '../../../utils/image/getGlViewItemAspect';
import { StoredMediaStateType } from '../../../stores/storedMedia';
import {
  ImageRelatedGlCollectionType,
  GlCollectionTypeArray,
} from '../../../stores/collectionData';

export type Props = {
  storedMediaData: StoredMediaStateType;
  collectionStateImageData: Pick<
    ImageRelatedGlCollectionType,
    'image'
  >['image'];
  updateImages: any;
  glCollectionOrderKey: number;
  OpenFileWindowFunction: any;
  updateSingleItemAspect: any;
  collectionData: GlCollectionTypeArray;
  isBoxSmallFlag: boolean;
  isImageBigFlag: boolean;
};

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const tabsStyle = css`
  margin-bottom: 8px;
`;

const gridListStyle = css`
  max-height: 300px;
`;

const gridListTileStyle = css`
  padding: 1px !important;
  cursor: pointer;
  .MuiGridListTile-tile {
    border: 1px solid rgba(255, 255, 255, 0);
  }
`;

const gridListTileStyleActive = css`
  .MuiGridListTile-tile {
    border: 1px solid rgba(255, 255, 255, 1);
  }
`;

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box>{children}</Box>
    </div>
  );
}

export default function MediaModalContents(props: Props) {
  const {
    storedMediaData,
    collectionStateImageData,
    updateImages,
    glCollectionOrderKey,
    OpenFileWindowFunction,
    updateSingleItemAspect,
    collectionData,
    isBoxSmallFlag,
    isImageBigFlag,
  } = props;

  const [value, setValue] = React.useState(0);
  const [isImageChangeFlag, setIsImageChangeFlag] = useState(false);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleImageChange = (targetImageID: any, targetBoolValue: any) => {
    updateImages({
      imageID: targetImageID,
      glCollectionOrderKey,
      boolValue: targetBoolValue,
    });
    setIsImageChangeFlag(true);
  };

  useEffect(() => {
    if (!isImageChangeFlag) {
      return;
    }
    const aspectValue = getGlViewItemAspect(collectionData, storedMediaData);
    updateSingleItemAspect({ aspectValue });
    setIsImageChangeFlag(false);
  }, [
    storedMediaData,
    isImageChangeFlag,
    collectionData,
    updateSingleItemAspect,
    setIsImageChangeFlag,
  ]);

  return (
    <Box width={isBoxSmallFlag ? 300 : 600}>
      <Box mb={1}>
        <Button
          onClick={OpenFileWindowFunction}
          variant="contained"
          color="primary"
          startIcon={<Icon type="functionUpload" />}
        >
          画像をアップロードする
          <Box pl={1}>
            <Typography variant="overline" display="block">
              (サーバーには保存されません）
            </Typography>
          </Box>
        </Button>
      </Box>
      <Tabs
        css={tabsStyle}
        value={value}
        onChange={handleTabChange}
        aria-label="フォルダタブ"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="すべてのメディア" />
        {/* <Tab label="フォルダ2" />
        <Tab label="フォルダ3" /> */}
      </Tabs>
      <TabPanel value={value} index={0}>
        {Object.keys(storedMediaData).length === 0 ? (
          <Typography variant="overline" display="block">
            画像をアップロードするとここに表示されます。
          </Typography>
        ) : (
          <GridList
            cellHeight={(isBoxSmallFlag ? 300 : 600) / (isImageBigFlag ? 4 : 9)}
            cols={isImageBigFlag ? 4 : 9}
            css={gridListStyle}
          >
            {Object.keys(storedMediaData).map((singleImageID: string) => {
              const isIncludeSingleImageID =
                collectionStateImageData != null
                  ? collectionStateImageData.includes(singleImageID)
                  : '';
              return (
                <GridListTile
                  onClick={() => {
                    handleImageChange(singleImageID, !isIncludeSingleImageID);
                  }}
                  css={
                    isIncludeSingleImageID
                      ? [gridListTileStyle, gridListTileStyleActive]
                      : gridListTileStyle
                  }
                  key={singleImageID}
                  cols={1}
                  rows={1}
                >
                  <img
                    src={storedMediaData[singleImageID].resource.small}
                    alt={singleImageID}
                  />
                </GridListTile>
              );
            })}
          </GridList>
        )}
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GridList
          cellHeight={(isBoxSmallFlag ? 300 : 600) / (isImageBigFlag ? 4 : 9)}
          cols={isImageBigFlag ? 4 : 9}
          css={gridListStyle}
        >
          {Object.keys(storedMediaData)
            .map((singleImageID: any) => {
              return (
                <GridListTile
                  css={gridListTileStyle}
                  key={singleImageID}
                  cols={1}
                  rows={1}
                >
                  <img
                    src={storedMediaData[singleImageID].resource.small}
                    alt={storedMediaData[singleImageID].name}
                  />
                </GridListTile>
              );
            })
            .slice(0, 7)}
        </GridList>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GridList
          cellHeight={(isBoxSmallFlag ? 300 : 600) / (isImageBigFlag ? 4 : 9)}
          cols={isImageBigFlag ? 4 : 9}
          css={gridListStyle}
        >
          {Object.keys(storedMediaData).map((singleImageID: any) => {
            return (
              <GridListTile
                css={gridListTileStyle}
                key={singleImageID}
                cols={1}
                rows={1}
              >
                <img
                  src={storedMediaData[singleImageID].resource.small}
                  alt="sample"
                />
              </GridListTile>
            );
          })}
        </GridList>
      </TabPanel>
    </Box>
  );
}
