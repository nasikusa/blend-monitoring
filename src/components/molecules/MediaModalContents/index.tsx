import React, { useState } from 'react';

// import Grid from '@material-ui/core/Grid';
import { css } from '@emotion/core';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

const tabsStyle = css`
  margin-bottom: 8px;
  background-color: #232323;
`;

const gridListStyle = css`
  height: 300px;
`;

const gridListTileStyle = css`
  padding: 1px !important;
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

export default function MediaModalContents(props: any) {
  const {
    storedMediaData,
    collectionStateImageData,
    updateImages,
    glCollectionOrderKey,
  } = props;
  const [imageBoxWidth] = useState<number>(600);
  const [imageBoxRowCount] = useState<number>(4);

  const [value, setValue] = React.useState(0);

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleImageChange = (targetImageID: any, targetBoolValue: any) => {
    updateImages({
      imageID: targetImageID,
      glCollectionOrderKey,
      boolValue: targetBoolValue,
    });
  };

  return (
    <Box width={imageBoxWidth}>
      <Tabs
        css={tabsStyle}
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleTabChange}
        aria-label="フォルダタブ"
      >
        <Tab label="フォルダ1" />
        <Tab label="フォルダ2" />
        <Tab label="フォルダ3" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <GridList
          cellHeight={imageBoxWidth / imageBoxRowCount}
          cols={imageBoxRowCount}
          css={gridListStyle}
        >
          {Object.keys(storedMediaData).map((singleImageID: any) => {
            const isIncludeSingleImageID = collectionStateImageData.includes(
              singleImageID
            );
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
      </TabPanel>
      <TabPanel value={value} index={1}>
        <GridList
          cellHeight={imageBoxWidth / imageBoxRowCount}
          cols={imageBoxRowCount}
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
                    alt="sample"
                  />
                </GridListTile>
              );
            })
            .slice(0, 7)}
        </GridList>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <GridList
          cellHeight={imageBoxWidth / imageBoxRowCount}
          cols={imageBoxRowCount}
          css={gridListStyle}
        >
          {Object.keys(storedMediaData).map((singleImageID: any) => {
            return (
              <GridListTile
                css={gridListTileStyle}
                key={singleImageID}
                cols={2}
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
