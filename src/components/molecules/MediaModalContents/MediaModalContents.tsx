import React from 'react';
import { batch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { css } from '@emotion/core';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Button from '@material-ui/core/Button';

/* eslint-disable import/no-unresolved */
import { CollectionCategoryType } from 'stores/collection/collection';
import { StoredMediaStateType } from 'stores/image/storedMedia';
import {
  ImageRelatedGlCollectionType,
  GlCollectionTypeArray,
} from 'types/collection/collectionData';
import { collectionValueImageType } from 'stores/collection/collectionValueImage';
/* eslint-enable import/no-unresolved */
import Icon from '../../atoms/Icon';

export type Props = {
  rawCollectionData: CollectionCategoryType;
  storedMediaData: StoredMediaStateType;
  storedImageValue: collectionValueImageType | collectionValueImageType[];
  collectionStateImageData: Pick<
    ImageRelatedGlCollectionType,
    'image'
  >['image'];
  updateImages: any;
  glCollectionOrderKey: number;
  OpenFileWindowFunction: any;
  updateSingleItemAspect: any;
  storeCollectionValueImageUpdateValue: any;
  collectionData: GlCollectionTypeArray;
  isBoxSmallFlag: boolean;
  isImageBigFlag: boolean;
  storeAddCollectionValueImage: any;
  storeAddCollectionItem: any;
  storeAddCollectionInnerItem: any;
  storeDeleteCollectionInnerItem: any;
};

interface TabPanelProps {
  children: React.ReactNode;
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
    rawCollectionData,
    storedImageValue,
    OpenFileWindowFunction,
    isBoxSmallFlag,
    isImageBigFlag,
    storeCollectionValueImageUpdateValue,
    storeAddCollectionValueImage,
    storeAddCollectionItem,
    storeAddCollectionInnerItem,
    storeDeleteCollectionInnerItem,
  } = props;

  const [tabValue, setTabValue] = React.useState(0);
  const storedImageValueValues = Array.isArray(storedImageValue)
    ? storedImageValue.map(
        (singleStoredImageValue) => singleStoredImageValue.value
      )
    : storedImageValue.value;

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabValue(newValue);
  };

  const handleImageChange = (
    targetImageID: any,
    targetBoolValue: boolean,
    targetIndex: number
  ) => {
    if (
      rawCollectionData.type === 'singleImageMultiBlends' ||
      rawCollectionData.type === 'singleImage'
    ) {
      storeCollectionValueImageUpdateValue({
        targetId: rawCollectionData.defaultImageId,
        targetIdNewValue: targetImageID,
      });
    } else if (rawCollectionData.type === 'multiImages') {
      const targetCollectionItemId = uuidv4();
      const targetCollectionValueId = uuidv4();
      if (targetBoolValue) {
        batch(() => {
          storeAddCollectionValueImage({
            targetId: targetCollectionValueId,
            targetIdNewValue: targetImageID,
          });

          storeAddCollectionItem({
            targetId: targetCollectionItemId,
            targetType: rawCollectionData.roughType,
            targetBlendModeId: rawCollectionData.defaultBlendModeId,
            targetOpacityId: rawCollectionData.defaultOpacityId,
            targetVisibilityId: rawCollectionData.defaultVisibilityId,
            targetImageId: targetCollectionValueId,
          });
          storeAddCollectionInnerItem({
            addIndexType: 'first',
            targetInnerItemId: targetCollectionItemId,
            targetId: rawCollectionData.id,
          });
        });
      } else if (!targetBoolValue) {
        storeDeleteCollectionInnerItem({
          targetId: rawCollectionData.id,
          targetInnerId: rawCollectionData.innerItemId[targetIndex],
        });
      }
    }
    // setIsImageChangeFlag(true);
  };

  // useEffect(() => {
  //   if (!isImageChangeFlag) {
  //     return;
  //   }
  //   const aspectValue = getGlViewItemAspect(collectionData, storedMediaData);
  //   updateSingleItemAspect({ aspectValue });
  //   setIsImageChangeFlag(false);
  // }, [
  //   storedMediaData,
  //   isImageChangeFlag,
  //   collectionData,
  //   updateSingleItemAspect,
  //   setIsImageChangeFlag,
  // ]);

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
        value={tabValue}
        onChange={handleTabChange}
        aria-label="フォルダタブ"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab label="すべてのメディア" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
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
              /**
               * チェックボックスのbool値を保存しておくための変数
               */
              let isIncludeSingleImageID = false;
              const targetIndex = Array.isArray(storedImageValueValues)
                ? storedImageValueValues.findIndex(
                    (singleStoredImageValueValue) =>
                      singleStoredImageValueValue === singleImageID
                  )
                : -1;
              if (Array.isArray(storedImageValueValues)) {
                isIncludeSingleImageID = targetIndex !== -1;
              } else {
                isIncludeSingleImageID =
                  storedImageValueValues === singleImageID;
              }

              // const isIncludeSingleImageID =
              //   storedImageValueValues != null &&
              //   Array.isArray(storedImageValueValues)
              //     ? storedImageValueValues.includes(singleImageID)
              //     : storedImageValueValues === singleImageID;
              return (
                <GridListTile
                  onClick={() => {
                    handleImageChange(
                      singleImageID,
                      !isIncludeSingleImageID,
                      targetIndex
                    );
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
                    src={storedMediaData[singleImageID].resource.thumb}
                    alt={singleImageID}
                  />
                </GridListTile>
              );
            })}
          </GridList>
        )}
      </TabPanel>
    </Box>
  );
}
